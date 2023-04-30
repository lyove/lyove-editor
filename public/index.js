/**
 * Create element and setting attribute
 * @param {string} name
 * @param {object} param
 * @returns HtmlElement
 */
const createElement = (name, { attributes = {}, html = "" } = {}) => {
  const element = document.createElement(name);
  element.innerHTML = html;
  Object.entries(attributes).forEach(([key, val]) => val && element.setAttribute(key, `${val}`));
  return element;
};

// Insert dom
document.body.insertBefore(
  createElement("div", { id: "rich-text-editor" }),
  document.body.lastChild,
);

// Desc
const descDom = document.querySelector(".desc");

/**
 * Load editor
 */
const loadEditor = (Editor) => {
  const header = document.getElementById("header");
  const lang = document.getElementById("lang");
  const rte = document.getElementById("rte") || document.getElementById("rich-text-editor");
  const clear = document.getElementById("clear");
  const save = document.getElementById("save");

  const changeDesc = (l) => {
    if (descDom) {
      descDom.innerHTML =
        l === "zh-cn"
          ? "🎨 Html5标准、且无任何依赖的所见即所得富文本编辑器"
          : "🎨 A Html5 standards-compliant and dependency-free WYSIWYG rich text editor";
    }
  };

  // Config
  const configs = {
    lang: lang.value,
    mode: "max",
    // customPlugins: {
    //   audio: {
    //     browser: "../document/browser/audio.html",
    //   },
    //   block: {
    //     api: "../document/api/{id}.html",
    //     browser: "../document/browser/block.html",
    //     css: "../document/css/base.css",
    //   },
    //   iframe: {
    //     browser: "../document/browser/iframe.html",
    //   },
    //   image: {
    //     browser: "../document/browser/image.html",
    //   },
    //   video: {
    //     browser: "../document/browser/video.html",
    //   },
    // },
    onValueChange: (value, event) => {
      console.log(value, event);
    },
  };

  // Init
  let editor = Editor.create(rte, configs);

  const reLoad = (langVal) => {
    editor?.destroy();
    editor = Editor.create(rte, {
      ...configs,
      lang: langVal,
    });
  };

  const toggle = (flag) => {
    Array.from(header.getElementsByTagName("select")).forEach((item) => (item.disabled = flag));
    clear.disabled = flag;
  };

  // Lang change
  lang.addEventListener("change", (e) => {
    const lv = e.target.value;
    reLoad(lv);
    changeDesc(lv);
  });

  // Clear
  clear.addEventListener("click", () => {
    editor.setHtml("");
    window.scrollTo(0, 0);
  });

  // Save
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

  save.textContent = rte?.hidden ? "Save" : "Edit";
};

/**
 * Dynamic import module
 */
const { hostname } = window.location;
const isIP = (str) => {
  const reg =
    /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/g;
  return reg.test(str);
};
// development
if (hostname === "localhost" || hostname === "127.0.0.1" || isIP(hostname)) {
  import("../src/editor.js").then((module) => {
    loadEditor(module.default);
  });
  import("../src/editor.less").then(() => {});
} else {
  // production
  loadEditor(window.LyoveEditor);
}
