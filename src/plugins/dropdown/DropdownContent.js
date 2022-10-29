import Icons from "../../icons/Icons.js";
import { ErrorMessage, TagName } from "../../utils/Enum.js";
import { isString, isOptString } from "../../utils/util.js";

/**
 * Dropdown Content Creator
 */
export default class DropdownContent {
  /**
   * Editor
   *
   * @type {Editor}
   */
  #editor;

  /**
   * Html element
   *
   * @type {HTMLElement}
   */
  #content;

  /**
   * Allows read access to content element
   *
   * @return {HTMLElement}
   */
  get content() {
    return this.#content;
  }

  /**
   * Ul element
   *
   * @type {HTMLElement}
   */
  #menu;

  /**
   * Allows read access to menu element
   *
   * @return {HTMLElement}
   */
  get menu() {
    return this.#menu;
  }

  /**
   * Initializes a menu creator
   *
   * @param {Editor} editor
   * @param {function} close
   */
  constructor(editor) {
    this.#editor = editor;
    this.#content = this.#editor.dom.createElement(TagName.DIV, {
      attributes: {
        class: `dropdown-content`,
      },
    });
    this.#menu = this.#editor.dom.createElement(TagName.UL, {
      attributes: {
        class: "dropdown-menu",
      },
    });
  }

  /**
   * Adds a new menu item
   * @return {this}
   */
  addMenuItem(item, attributes = {}) {
    if (!(isString(item) || item instanceof HTMLElement)) {
      throw new Error(ErrorMessage.INVALID_ARGUMENT);
    }

    const attrs = { ...attributes };
    if (attrs.class !== "dropdown-menu-item") {
      attrs.class = "dropdown-menu-item";
    }

    const li = this.#editor.dom.createElement(TagName.LI, {
      attributes: attrs,
    });

    if (isString(item)) {
      li.innerHTML = item;
    } else if (item instanceof HTMLElement) {
      li.appendChild(item);
    }
    this.#menu.appendChild(li);
    this.#content.appendChild(this.#menu);

    return this;
  }

  /**
   * Adds a new html item
   * @return {this}
   */
  addHtmlElement(item, attributes = {}) {
    if (!(isString(item) || item instanceof HTMLElement)) {
      throw new Error(ErrorMessage.INVALID_ARGUMENT);
    }

    if (isString(item)) {
      this.#content.innerHTML = item;
    } else if (item instanceof HTMLElement) {
      this.#content.appendChild(item);
    }

    return this;
  }

  /**
   * Creates a button
   *
   * @param {string} label
   * @param {string} title
   * @param {string|undefined} [key]
   * @param {string|undefined} [command]
   * @return {HTMLButtonElement}
   */
  createButton({ label, command, title, key, tip }) {
    if (!isString(label) || !isString(title) || !isOptString(key)) {
      throw new Error(ErrorMessage.INVALID_ARGUMENT);
    }
    const icon = `<span class='btn-icon'>${Icons[command]}</span>`;
    const text = `<span class='btn-label'>${label}</span>`;
    return this.#editor.dom.createElement(TagName.BUTTON, {
      attributes: {
        type: "button",
        title: title,
        "data-title": title,
        "data-command": command,
        "data-key": key,
        ...(tip
          ? {
              "data-tip": "tooltip",
              "data-tip-placement": "right",
            }
          : {}),
      },
      html: Icons[command] ? `${icon}${text}` : label,
    });
  }
}
