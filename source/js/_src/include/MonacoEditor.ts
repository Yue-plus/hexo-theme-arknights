'use strict'

declare const monaco: any;

class MonacoEditor {
  // keep references to editors to avoid garbage collection
  private editors = new Map<HTMLElement, any>();

  private updateEditorLayout = () => {
    for (const [container, ed] of Array.from(this.editors.entries())) {
      if (!(container instanceof HTMLElement) || !container.isConnected) {
        this.editors.delete(container);
        continue;
      }

      try {
        ed.layout();
      } catch (e) { /* ignore */ }
    }
  }

  private createEditor = (container: HTMLElement, lang: string, theme: string, readOnly: boolean, height: string, options: any) => {
    if (container.getAttribute('data-initialized') === 'true') return;
    container.setAttribute('data-initialized', 'true');

    container.style.height = height;

    try {
      const mon = (window as any).monaco || (monaco as any);
      if (!mon || !mon.editor || !mon.editor.create) {
        console.error('MonacoEditor: monaco not available when trying to create editor');
        return;
      }

      // prefer the <pre> source textContent to avoid HTML-escaped entities
      const pre = container.querySelector('pre');
      const source = pre?.textContent || '';

      const editor = mon.editor.create(container, {
        value: source,
        language: lang,
        theme: theme,
        readOnly: readOnly,
        ...options,
      });

      // store editor instance to avoid garbage collection
      this.editors.set(container, editor);
    } catch (e) {
      console.error('MonacoEditor: failed to create editor', e);
    }
  }

  private findEditor = () => {
    const editors = document.querySelectorAll('.monaco-editor-code');
    editors.forEach((editor) => {
      const lang = editor.getAttribute('data-lang') || 'javascript';
      const theme = editor.getAttribute('data-theme') || 'vs-dark';
      const readOnly = editor.getAttribute('data-readonly') || 'false';
      const height = editor.getAttribute('data-height') || '300px';

      const rawOptions = editor.getAttribute('data-options') || '{}';
      let options: any = {};
      try {
        // decode HTML entities (e.g. &quot;) produced by server-side escaping
        const decoded = new DOMParser().parseFromString(rawOptions, 'text/html').documentElement.textContent || rawOptions;
        options = JSON.parse(decoded || '{}');
      } catch (e) {
        try {
          // fallback: maybe server used encodeURIComponent
          options = JSON.parse(decodeURIComponent(rawOptions));
        } catch (e2) {
          console.warn('MonacoEditor: failed to parse data-options, using empty options', rawOptions, e2);
          options = {};
        }
      }

      this.createEditor(editor as HTMLElement, lang, theme, Boolean(readOnly), height, options);
    });
    this.updateEditorLayout();
  }

  private loadMonaco = () => {
    if (typeof (window as any).hexo_monaco === 'undefined') {
      const loader = document.createElement('script');
      loader.src = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs/loader.js';
      loader.onload = () => {
        (window as any).require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs' } });
        (window as any).require(['vs/editor/editor.main'], () => {
          (window as any).hexo_monaco = true; // prevent loading multiple times
          this.findEditor();
        });
      }
      loader.onerror = () => {
        console.error('Failed to load Monaco Editor loader script.');
      }
      document.body.appendChild(loader);
    } else {
      this.findEditor();
    }
  }

  constructor() {
    this.loadMonaco()
    document.addEventListener('pjax:success', this.loadMonaco)
    window.addEventListener('hexo-blog-decrypt', this.loadMonaco)
    window.addEventListener('resize', this.updateEditorLayout);
  }
};

let monaco_editor = new MonacoEditor();
