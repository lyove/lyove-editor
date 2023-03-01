import Base from "./Base.js";
import Dom from "./Dom.js";
import Dispatcher from "./Dispatcher.js";
import CommandManager from "./CommandManager.js";
import FilterManager from "./FilterManager.js";
import PluginManager from "./PluginManager.js";
import TagManager from "./TagManager.js";
import DialogManager from "../modules/dialog/DialogManager.js";
import DropdownManager from "../modules/dropdown/DropdownManager.js";
import { ErrorMessage, Position, TagName } from "../utils/Enum.js";
import Translator from "./Translator.js";

/**
 * Core
 */
export default class Core {
  /**
   * Corresponding DOM element of the source
   *
   * @type {HTMLElement}
   */
  #originElement;

  /**
   * Allows read access to corresponding DOM element of the source
   *
   * @return {HTMLElement}
   */
  get originElement() {
    return this.#originElement;
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
  #editorElement;

  /**
   * Allows read access to corresponding DOM element of the editor
   *
   * @return {HTMLElement}
   */
  get editorElement() {
    return this.#editorElement;
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
   * Corresponding DOM element of the main toolbox
   *
   * @type {HTMLElement}
   */
  #toolbox;

  /**
   * Allows read access to corresponding DOM element of the main toolbox
   *
   * @return {HTMLElement}
   */
  get toolbox() {
    return this.#toolbox;
  }

  /**
   * Event dispatcher of the editor main toolbox
   *
   * @type {Dispatcher}
   */
  #toolboxDispatcher;

  /**
   * Allows read access to event dispatcher of the editor main toolbox
   *
   * @return {Dispatcher}
   */
  get toolboxDispatcher() {
    return this.#toolboxDispatcher;
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
   * Creates a new instance of editor with given configuration
   *
   * @param {HTMLElement} element
   * @param {Object} [config = {}]
   */
  constructor(element, config = {}) {
    if (!(element instanceof HTMLElement) || !(config instanceof Object)) {
      throw new Error(ErrorMessage.INVALID_ARGUMENT);
    }

    this.#originElement = element;
    this.#config = config;
    this.#dom = new Dom(this, this.originElement.ownerDocument);
    this.#editorElement = this.dom.createElement(TagName.EDITOR);

    // Menubar
    this.#menubar = this.dom.createElement(TagName.MENUBAR, {
      attributes: { role: "toolbar" },
    });
    this.editorElement.appendChild(this.menubar);
    this.#menubarDispatcher = new Dispatcher(this.menubar);

    // Toolbox
    this.#toolbox = this.dom.createElement(TagName.TOOLBOX, {
      attributes: { role: "toolbar" },
    });
    this.editorElement.appendChild(this.toolbox);
    this.#toolboxDispatcher = new Dispatcher(this.toolbox);

    // Toolbar
    this.#toolbar = this.dom.createElement(TagName.TOOLBAR, {
      attributes: { role: "toolbar" },
    });
    this.editorElement.appendChild(this.toolbar);
    this.#toolbarDispatcher = new Dispatcher(this.toolbar);

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
    this.editorElement.appendChild(this.focusbar);
    this.#focusbarDispatcher = new Dispatcher(this.focusbar);

    // Textarea
    this.#textarea = this.dom.createElement(TagName.TEXTAREA);
    this.editorElement.appendChild(this.textarea);
    this.#textareaDispatcher = new Dispatcher(this.textarea);

    // init
    this.init();

    // load
    this.load();

    // freeze
    this.freeze();

    // bind event
    this.bindEvent(this);
  }

  /**
   * Initializes plugins and configuration
   *
   * @return {void}
   */
  init() {
    // Plugins
    const { builtinPlugins, pluginNames } = this.config;
    const pluginSets = new Set();
    (Array.isArray(pluginNames) && pluginNames.length > 0
      ? builtinPlugins.filter((m) => pluginNames.includes(m.name))
      : builtinPlugins
    ).forEach((plugin) => {
      const iterator = (item) => {
        if (Array.isArray(item?.dependencies)) {
          item.dependencies.forEach(iterator);
        }
        pluginSets.add(item);
      };
      iterator(plugin);
    });
    pluginSets.forEach((item) => {
      this.plugins.set(new item(this));
    });

    // Base
    this.plugins.set(new Base(this));

    // init
    this.plugins.init();
    this.menubarDispatcher.dispatch("init");
    this.toolboxDispatcher.dispatch("init");
    this.toolbarDispatcher.dispatch("init");
    this.focusbarDispatcher.dispatch("init");
    this.textareaDispatcher.dispatch("init");
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
      this.textarea.appendChild(this.dom.createElement("p"));
    }
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
    if (this.originElement instanceof HTMLTextAreaElement) {
      this.setHtml(this.originElement.value.replace("/&nbsp;/g", " "));
    } else {
      this.setHtml(this.originElement.innerHTML);
    }

    Array.from(this.editorElement.children).forEach((item) => {
      if (item.children.length === 0) {
        if (item.localName === TagName.MENUBAR) {
          item.parentElement.removeChild(item);
        }
      }
    });

    this.originElement.insertAdjacentElement(Position.AFTEREND, this.editorElement);
    this.originElement.hidden = true;
    this.textareaDispatcher.dispatch("load");
  }

  /**
   * Removes editor element from DOM
   *
   * @return {void}
   */
  destroy() {
    this.editorElement.parentElement?.removeChild(this.editorElement);
    this.originElement.hidden = false;
    this.textareaDispatcher.dispatch("destroy");
  }

  /**
   * Event
   */
  bindEvent() {
    this.textarea.addEventListener("input", this.onInput.bind(this));
    this.textarea.addEventListener("click", this.onClick.bind(this));
    this.textarea.addEventListener("keydown", this.onKeydown.bind(this));
    this.textarea.addEventListener("keyup", this.onKeyup.bind(this));
  }

  /**
   * Factory method to create a new editor instance with given configuration
   *
   * @param {HTMLElement} element
   * @param {Object} [config = {}]
   * @return {Core}
   */
  static create(element, config = {}) {
    const editor = new this(element, config);
    return editor;
  }
}
