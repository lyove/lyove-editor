/**
 * Demo document
 */
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

document.body.insertBefore(
  createElement("div", { id: "rich-text-editor" }),
  document.body.lastChild,
);

const header = document.getElementById("header");
const lang = document.getElementById("lang");
const rte = document.getElementById("rte") || document.getElementById("rich-text-editor");
const clear = document.getElementById("clear");
const save = document.getElementById("save");

// Config
const configs = {
  lang: lang.value,
  pluginNames: [], // ['help', 'heading', 'paragraph', 'bold', 'sort']
  customPlugins: {
    audio: {
      browser: "./browser/audio.html",
    },
    block: {
      api: "./api/{id}.html",
      browser: "./browser/block.html",
      css: "./css/base.css",
    },
    iframe: {
      browser: "./browser/iframe.html",
    },
    image: {
      browser: "./browser/image.html",
    },
    video: {
      browser: "./browser/video.html",
    },
  },
  onValueChange: (value, event) => {
    console.log(value, event);
  },
};

const Editor = window.LyoveEditor;

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
