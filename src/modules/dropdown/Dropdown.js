import DropdownContent from "./DropdownContent.js";
import { ErrorMessage, Position, TagName } from "../../utils/Enum.js";
import { isString } from "../../utils/util.js";

/**
 * Dropdown
 */
export default class Dropdown {
  /**
   * Editor
   *
   */
  #editor;

  /**
   * Allows read access to editor
   *
   * @return {Editor}
   */
  get editor() {
    return this.#editor;
  }

  /**
   * Name
   *
   * @type {string}
   */
  #name;

  /**
   * Allows read access to name
   *
   * @return {string}
   */
  get name() {
    return this.#name;
  }

  /**
   * Menu creator
   *
   * @type {MenuCreator|undefined}
   */
  #dropdownContent;

  /**
   * Allows read access to menu creator
   *
   * @type {MenuCreator}
   */
  get dropdownContent() {
    return this.#dropdownContent;
  }

  /**
   * Initializes a new dropdown with given name
   *
   * @param {Editor} editor
   * @param {string} name
   */
  constructor(editor, name) {
    if (!isString(name)) {
      throw new Error(ErrorMessage.INVALID_ARGUMENT);
    }

    this.#editor = editor;
    this.#name = name;
  }

  /**
   * Translates given string
   *
   * @protected
   * @param {string} key
   * @return {string}
   */
  _(key) {
    return this.editor.translator.translate(this.name, key);
  }

  /**
   * Opens a dropdown
   *
   * @param {Object} [attributes = {}]
   * @param {HTMLElement} element
   * @return {void}
   */
  open(execute, attributes = {}, triggerElement) {
    this.#openDropdown(execute, attributes, triggerElement);
  }

  /**
   * Opens a dropdown
   *
   * @param {function} execute
   * @param {Object} [attributes = {}]
   * @param {HTMLElement} triggerElement
   * @return {void}
   */
  #openDropdown(execute, attributes, triggerElement) {
    const range = this.editor.dom.getRange();
    this.cleanup();
    this.#dropdownContent = new DropdownContent(this.#editor);
    this._prepareContent?.();
    const dropdown = this.#editor.dom.createElement(TagName.DROPDOWN, {
      attributes: {
        ...attributes,
        class: attributes["data-command"] || "",
        "data-uuid": triggerElement.dataset.uuid,
      },
    });
    const arrow = this.#editor.dom.createElement(TagName.I, {
      attributes: { class: "arrow", role: "arrow" },
    });
    dropdown.insertAdjacentElement(Position.AFTERBEGIN, arrow);
    dropdown.addEventListener("close", () => {
      range && this.editor.dom.setRange(range);
      this.cleanup();
    });
    const { content } = this.dropdownContent;
    dropdown.appendChild(content);
    this._readyContent?.(dropdown, content, execute, () => this.cleanup());
    dropdown.show(triggerElement, this.#editor.element);
    this.#setArrowIcon(triggerElement, true);
  }

  /**
   * Set arrow icon
   *
   * @return {void}
   */
  #setArrowIcon(triggerElement, type) {
    const arrowElement = Array.from(triggerElement.children).find(
      (item) => item.className.indexOf("btn-arrow") > -1,
    );
    if (arrowElement) {
      arrowElement.classList.remove(type ? "down" : "up");
      arrowElement.classList.add(type ? "up" : "down");
    }
  }

  /**
   * Removes all existing editor dropdowns
   *
   * @return {void}
   */
  cleanup() {
    const thisEditorElement = this.#editor.element;
    const dropdowns = thisEditorElement.getElementsByTagName(TagName.DROPDOWN);
    Array.from(dropdowns).forEach((item) => {
      item.classList.remove("dropdown-animate-in");
      item.classList.add("dropdown-animate-out");
      if (item.parentElement) {
        item.parentElement?.removeChild(item);
        const { command } = item.dataset;
        if (command) {
          const targetButton = thisEditorElement.querySelector(`button[data-command=${command}]`);
          this.#setArrowIcon(targetButton, false);
        }
      }
    });
  }
}
