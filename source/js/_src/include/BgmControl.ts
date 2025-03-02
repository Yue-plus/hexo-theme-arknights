function BgmControl() {
    const bgm = document.getElementById('bgm') as HTMLAudioElement;
    const control = document.getElementById("bgm-control");
    if (bgm.paused) {
      bgm.play();
      control!.setAttribute("fill", "#18d1ff");
      control!.style.transform = "scaleY(1)";
    } else {
      bgm.pause();
      control!.setAttribute("fill", "currentColor");
      control!.style.transform = "scaleY(.5)";
    }
}