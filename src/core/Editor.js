import Dom from "./Dom.js";
import Dispatcher from "./Dispatcher.js";
import CommandManager from "./CommandManager.js";
import FilterManager from "./FilterManager.js";
import PluginManager from "./PluginManager.js";
import TagManager from "./TagManager.js";
import DialogManager from "../modules/dialog/DialogManager.js";
import DropdownManager from "../modules/dropdown/DropdownManager.js";
import { EditorMode, ErrorMessage, Position, TagName } from "../utils/Enum.js";
import Translator from "./Translator.js";

/**
 * Core Editor
 */
export default class Editor {
  /**
   * Corresponding DOM element of the source
   *
   * @type {HTMLElement}
   */
  #orig;

  /**
   * Allows read access to corresponding DOM element of the source
   *
   * @return {HTMLElement}
   */
  get orig() {
    return this.#orig;
  }

  /**
   * Configuration
   *
   * @type {Object}
   */
  #config = {};

  /**
   * Allows read access to configuration
   *
   * @return {Object}
   */
  get config() {
    return this.#config;
  }

  /**
   * DOM manager
   *
   * @type {Dom}
   */
  #dom;

  /**
   * Allows read access to DOM manager
   *
   * @return {Dom}
   */
  get dom() {
    return this.#dom;
  }

  /**
   * Corresponding DOM element of the editor
   *
   * @type {HTMLElement}
   */
  #element;

  /**
   * Allows read access to corresponding DOM element of the editor
   *
   * @return {HTMLElement}
   */
  get element() {
    return this.#element;
  }

  /**
   * Corresponding DOM element of the menubar
   *
   * @type {HTMLElement}
   */
  #menubar;

  /**
   * Allows read access to corresponding DOM element of the menubar
   *
   * @return {HTMLElement}
   */
  get menubar() {
    return this.#menubar;
  }

  /**
   * Event dispatcher of the editor menubar
   *
   * @type {Dispatcher}
   */
  #menubarDispatcher;

  /**
   * Allows read access to event dispatcher of the editor menubar
   *
   * @return {Dispatcher}
   */
  get menubarDispatcher() {
    return this.#menubarDispatcher;
  }

  /**
   * Corresponding DOM element of the main toolbar
   *
   * @type {HTMLElement}
   */
  #toolbar;

  /**
   * Allows read access to corresponding DOM element of the main toolbar
   *
   * @return {HTMLElement}
   */
  get toolbar() {
    return this.#toolbar;
  }

  /**
   * Event dispatcher of the editor main toolbar
   *
   * @type {Dispatcher}
   */
  #toolbarDispatcher;

  /**
   * Allows read access to event dispatcher of the editor main toolbar
   *
   * @return {Dispatcher}
   */
  get toolbarDispatcher() {
    return this.#toolbarDispatcher;
  }

  /**
   * Corresponding DOM element of the formatbar
   *
   * @type {HTMLElement}
   */
  #formatbar;

  /**
   * Allows read access to corresponding DOM element of the formatbar
   *
   * @return {HTMLElement}
   */
  get formatbar() {
    return this.#formatbar;
  }

  /**
   * Event dispatcher of the editor formatbar
   *
   * @type {Dispatcher}
   */
  #formatbarDispatcher;

  /**
   * Allows read access to event dispatcher of the editor formatbar
   *
   * @return {Dispatcher}
   */
  get formatbarDispatcher() {
    return this.#formatbarDispatcher;
  }

  /**
   * Corresponding DOM element of the focusbar
   *
   * @type {HTMLElement}
   */
  #focusbar;

  /**
   * Allows read access to corresponding DOM element of the focusbar
   *
   * @return {HTMLElement}
   */
  get focusbar() {
    return this.#focusbar;
  }

  /**
   * Event dispatcher of the editor focusbar
   *
   * @type {Dispatcher}
   */
  #focusbarDispatcher;

  /**
   * Allows read access to event dispatcher of the editor focusbar
   *
   * @return {Dispatcher}
   */
  get focusbarDispatcher() {
    return this.#focusbarDispatcher;
  }

  /**
   * Corresponding DOM element of the editor content textarea
   *
   * @type {HTMLElement}
   */
  #textarea;

  /**
   * Allows read access to corresponding DOM element of the editor content textarea
   *
   * @return {HTMLElement}
   */
  get textarea() {
    return this.#textarea;
  }

  /**
   * Event dispatcher of the editor content textarea
   *
   * @type {Dispatcher}
   */
  #textareaDispatcher;

  /**
   * Allows read access to event dispatcher of the editor content textarea
   *
   * @return {Dispatcher}
   */
  get textareaDispatcher() {
    return this.#textareaDispatcher;
  }

  /**
   * Translator
   *
   * @type {Translator}
   */
  #translator = new Translator();

  /**
   * Allows read access to translator
   *
   * @return {Translator}
   */
  get translator() {
    return this.#translator;
  }

  /**
   * Tag manager
   *
   * @type {TagManager}
   */
  #tags = new TagManager();

  /**
   * Allows read access to tag manager
   *
   * @return {TagManager}
   */
  get tags() {
    return this.#tags;
  }

  /**
   * Filter manager
   *
   * @type {FilterManager}
   */
  #filters = new FilterManager();

  /**
   * Allows read access to filter manager
   *
   * @return {FilterManager}
   */
  get filters() {
    return this.#filters;
  }

  /**
   * Dialog manager
   *
   * @type {DialogManager}
   */
  #dialogs = new DialogManager();

  /**
   * Allows read access to dialog manager
   *
   * @type {DialogManager}
   */
  get dialogs() {
    return this.#dialogs;
  }

  /**
   * Dropdown manager
   *
   * @type {DropdownManager}
   */
  #dropdowns = new DropdownManager();

  /**
   * Allows read access to dropdown manager
   *
   * @type {DropdownManager}
   */
  get dropdowns() {
    return this.#dropdowns;
  }

  /**
   * Command manager
   *
   * @type {CommandManager}
   */
  #commands = new CommandManager();

  /**
   * Allows read access to command manager
   *
   * @return {CommandManager}
   */
  get commands() {
    return this.#commands;
  }

  /**
   * Plugin manager
   *
   * @type {PluginManager}
   */
  #plugins = new PluginManager();

  /**
   * Allows read access to plugin manager
   *
   * @return {PluginManager}
   */
  get plugins() {
    return this.#plugins;
  }

  /**
   * Default configuration
   *
   * @type {Object.<string, Object>}
   */
  static get defaultPlugins() {
    return {};
  }

  /**
   * Creates a new instance of editor with given configuration
   *
   * @param {HTMLElement} orig
   * @param {Object} [config = {}]
   */
  constructor(orig, config = {}) {
    if (!(orig instanceof HTMLElement) || !(config instanceof Object)) {
      throw new Error(ErrorMessage.INVALID_ARGUMENT);
    }

    this.#orig = orig;
    this.#config = {
      ...this.constructor.config,
      ...config,
    };
    this.#dom = new Dom(this, this.orig.ownerDocument);
    this.#element = this.dom.createElement(TagName.EDITOR);

    // Menubar
    this.#menubar = this.dom.createElement(TagName.MENUBAR, {
      attributes: { role: "toolbar" },
    });
    this.element.appendChild(this.menubar);
    this.#menubarDispatcher = new Dispatcher(this.menubar);

    // Toolbar
    this.#toolbar = this.dom.createElement(TagName.TOOLBAR, {
      attributes: { role: "toolbar" },
    });
    this.element.appendChild(this.toolbar);
    this.#toolbarDispatcher = new Dispatcher(this.toolbar);

    // Formatbar
    this.#formatbar = this.dom.createElement(TagName.FORMATBAR, {
      attributes: { role: "toolbar" },
    });
    this.formatbar.hidden = true;
    this.element.appendChild(this.formatbar);
    this.#formatbarDispatcher = new Dispatcher(this.formatbar);

    // Focusbar
    this.#focusbar = this.dom.createElement(TagName.FOCUSBAR, {
      attributes: { role: "toolbar" },
    });
    this.focusbar.appendChild(
      this.dom.createElement(TagName.SPAN, { attributes: { class: "trigger" } }),
    );
    this.focusbar.appendChild(
      this.dom.createElement(TagName.DIV, {
        attributes: { class: "trigger-content" },
      }),
    );
    this.focusbar.hidden = true;
    this.element.appendChild(this.focusbar);
    this.#focusbarDispatcher = new Dispatcher(this.focusbar);

    // Textarea
    this.#textarea = this.dom.createElement(TagName.TEXTAREA);
    this.element.appendChild(this.textarea);
    this.#textareaDispatcher = new Dispatcher(this.textarea);
  }

  /**
   * Initializes plugins and configuration
   *
   * @return {void}
   */
  init() {
    const config = this.config;
    const { mode, pluginNames } = config;

    // Plugins
    const builtinPlugins =
      this.constructor[EditorMode[mode]]?.plugins || this.constructor.defaultPlugins?.plugins || [];
    const maxPlugins = this.constructor.maxPlugins?.plugins;
    const pluginsSet = new Set();
    const configured =
      Array.isArray(pluginNames) && pluginNames.length > 0
        ? maxPlugins.filter((m) => pluginNames.includes(m.name))
        : builtinPlugins;
    configured.forEach((plugin) => {
      const flatPlugins = (item) => {
        if (Array.isArray(item?.dependencies)) {
          item.dependencies.forEach(flatPlugins);
        }
        pluginsSet.add(item);
      };
      flatPlugins(plugin);
    });
    pluginsSet.forEach((item) => {
      this.plugins.set(new item(this));
    });

    // Lang
    if (this.config.lang) {
      this.element.lang = this.config.lang;
    }

    this.plugins.init();
    this.toolbarDispatcher.dispatch("init");
    this.formatbarDispatcher.dispatch("init");
    this.focusbarDispatcher.dispatch("init");
    this.textareaDispatcher.dispatch("init");
  }

  /**
   * Freezes the editor and its configuration
   *
   * @return {void}
   */
  freeze() {
    Object.freeze(this.config);
    this.translator.freeze();
    this.tags.freeze();
    this.filters.freeze();
    this.dialogs.freeze();
    this.dropdowns.freeze();
    this.commands.freeze();
    this.plugins.freeze();
  }

  /**
   * Loads editor element into DOM
   *
   * @return {void}
   */
  load() {
    if (this.orig instanceof HTMLTextAreaElement) {
      this.setHtml(this.orig.value.replace("/&nbsp;/g", " "));
    } else {
      this.setHtml(this.orig.innerHTML);
    }

    Array.from(this.element.children).forEach((item) => {
      if (item.children.length === 0) {
        if (item.localName === TagName.MENUBAR) {
          item.parentElement.removeChild(item);
        }
      }
    });

    this.orig.insertAdjacentElement(Position.AFTEREND, this.element);
    this.orig.hidden = true;
    this.textareaDispatcher.dispatch("load");
  }

  /**
   * Removes editor element from DOM
   *
   * @return {void}
   */
  destroy() {
    this.element.parentElement?.removeChild(this.element);
    this.orig.hidden = false;
    this.textareaDispatcher.dispatch("destroy");
  }

  /**
   * Returns editor content textarea element's innerHTML
   *
   * @return {string}
   */
  getHtml() {
    const textarea = this.dom.createElement(this.textarea.localName, {
      html: this.textarea.innerHTML,
    });
    this.filters.filter(textarea);
    this.textareaDispatcher.dispatch("gethtml", textarea);

    return textarea.innerHTML;
  }

  /**
   * Sets editor content textarea element's innerHTML
   *
   * @param {string} html
   * @return {void}
   */
  setHtml(html) {
    const textarea = this.dom.createElement(this.textarea.localName, { html });
    this.textareaDispatcher.dispatch("sethtml", textarea);
    this.filters.filter(textarea);
    this.textarea.innerHTML = textarea.innerHTML;
    if (!textarea.innerHTML) {
      this.textarea.appendChild(this.dom.createElement(TagName.P));
    }
  }

  /**
   * Saves editor data to source element
   *
   * @return {void}
   */
  save() {
    if (this.orig instanceof HTMLTextAreaElement) {
      this.orig.value = this.getHtml();
    } else {
      this.orig.innerHTML = this.getHtml();
    }

    this.textareaDispatcher.dispatch("save");
  }

  /**
   * Returns relative or absolute URL depending on its origin
   *
   * @param {string} url
   * @return {string}
   */
  url(url) {
    const origin = this.dom.window.origin || this.dom.window.location.origin;
    /** @type {HTMLAnchorElement} */
    const a = this.dom.createElement(TagName.A, { attributes: { href: url } });

    return origin === a.origin ? a.pathname : a.href;
  }

  /**
   * Factory method to create a new editor instance with given configuration
   *
   * @param {HTMLElement} element
   * @param {Object} [config = {}]
   * @return {Editor}
   */
  static create(element, config = {}) {
    const editor = new this(element, config);
    editor.init();
    editor.load();
    editor.freeze();
    return editor;
  }
}
