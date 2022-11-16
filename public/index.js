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

/**
 * Load editor
 */
const loadEditor = (Editor) => {
  const header = document.getElementById("header");
  const lang = document.getElementById("lang");
  const rte = document.getElementById("rte") || document.getElementById("rich-text-editor");
  const clear = document.getElementById("clear");
  const save = document.getElementById("save");

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

  const reLoad = (v) => {
    editor?.destroy();
    editor = Editor.create(rte, {
      ...configs,
      lang: v,
    });
  };

  const toggle = (flag) => {
    Array.from(header.getElementsByTagName("select")).forEach((item) => (item.disabled = flag));
    clear.disabled = flag;
  };

  // Lang change
  lang.addEventListener("change", (e) => {
    reLoad(e.target.value);
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
