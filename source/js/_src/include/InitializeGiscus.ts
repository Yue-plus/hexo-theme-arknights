'use strict'

try {
  function initializeGiscus() {
    const post_bg = document.getElementById("post-bg");
    if (post_bg !== null) {
      const existingScript = post_bg.querySelector('script[src="https://giscus.app/client.js"]');
      if (existingScript !== null) {
        post_bg.removeChild(existingScript);
      }

      const themeMode = document.documentElement.getAttribute('theme-mode');
      const scriptElement = document.createElement('script');

      scriptElement.src = "https://giscus.app/client.js";
      scriptElement.setAttribute('data-repo', 'weilycoder/blog_giscus');
      scriptElement.setAttribute('data-repo-id', 'R_kgDOOQzAwg');
      scriptElement.setAttribute('data-category', 'Announcements');
      scriptElement.setAttribute('data-category-id', 'DIC_kwDOOQzAws4ColJL');
      scriptElement.setAttribute('data-mapping', 'pathname');
      scriptElement.setAttribute('data-strict', '1');
      scriptElement.setAttribute('data-reactions-enabled', '1');
      scriptElement.setAttribute('data-emit-metadata', '1');
      scriptElement.setAttribute('data-input-position', 'top');
      scriptElement.setAttribute('data-theme', themeMode === 'light' ? 'light_high_contrast' : 'dark_high_contrast');
      scriptElement.setAttribute('data-lang', 'zh-CN');
      scriptElement.setAttribute('crossorigin', 'anonymous');
      scriptElement.async = true;

      post_bg.appendChild(scriptElement);
    }
  }

  initializeGiscus();

  document.addEventListener('pjax:complete', function () {
    initializeGiscus();
  });
} catch (e) {
  console.error("Failed to initialize Giscus", e);
}