// Dynamic import module
import("../src/editor.js")
  .then((module) => {
    loadEditor(module.default);
  })
  .catch(async () => {
    loadEditor(window.lyoveEditor);
  });

import("../src/editor.less")
  .then((module) => {
    //console.log(module.default);
  })
  .catch((err) => {
    // console.log(err);
  });

const loadEditor = (Editor) => {
  const header = document.getElementById("header");
  const lang = document.getElementById("lang");
  const rte = document.getElementById("rte");
  const rte2 = document.getElementById("rte2");
  const clear = document.getElementById("clear");
  const save = document.getElementById("save");
  let editor, editor2;
  const toggle = (flag) => {
    Array.from(header.getElementsByTagName("select")).forEach(
      (item) => (item.disabled = flag)
    );
    clear.disabled = flag;
  };
  const init = () => {
    editor?.destroy();
    if (rte) {
      editor = Editor.create(rte, {
        lang: lang.value,
        mode: "max",
        customPlugins: {
          audio: {
            browser: "browser/audio.html",
          },
          block: {
            api: "api/{id}.html",
            browser: "browser/block.html",
            css: "css/app.css",
          },
          iframe: {
            browser: "browser/iframe.html",
          },
          image: {
            browser: "browser/image.html",
          },
          video: {
            browser: "browser/video.html",
          },
        },
        onValueChange: (value, event) => {
          console.log(value, event);
        },
      });
    }
    if (rte2) {
      editor2?.destroy();
      editor2 = Editor.create(rte2, {
        lang: lang.value,
        mode: "default",
      });
    }
  };
  lang.addEventListener("change", init);
  clear.addEventListener("click", () => {
    editor.setHtml("");
    window.scrollTo(0, 0);
  });
  save.addEventListener("click", () => {
    if (rte?.hidden) {
      editor.save();
      editor.destroy();
      save.textContent = "Edit";
      toggle(true);
    } else {
      editor.load();
      save.textContent = "Save";
      toggle(false);
    }
  });
  init();
  save.textContent = rte?.hidden ? "Save" : "Edit";
};
