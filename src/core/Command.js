import Editor from "./Editor.js";
import { ErrorMessage, TagGroup, TagName } from "../utils/Enum.js";
import { isOptString, isString } from "../utils/util.js";

/**
 * Command
 */
export default class Command {
  /**
   * Editor
   *
   * @type {Editor}
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
   * Associated tag
   *
   * @type {Tag|undefined}
   */
  #tag;

  /**
   * Allows read access to associated tag
   *
   * @return {Tag|undefined}
   */
  get tag() {
    return this.#tag;
  }

  /**
   * Associated dialog
   *
   * @type {Dialog|undefined}
   */
  #dialog;

  /**
   * Allows read access to associated dialog
   *
   * @return {Dialog|undefined}
   */
  get dialog() {
    return this.#dialog;
  }

  /**
   * Associated dropdown
   *
   * @type {Dropdown|undefined}
   */
  #dropdown;

  /**
   * Allows read access to associated dropdown
   *
   * @return {Dropdown|undefined}
   */
  get dropdown() {
    return this.#dropdown;
  }

  /**
   * Initializes a new editor command optionally with given tag name
   *
   * @param {Editor} editor
   * @param {string} name
   * @param {string} tagName
   */
  constructor(editor, name, tagName) {
    if (!(editor instanceof Editor) || !isString(name) || !isOptString(tagName)) {
      throw new Error(ErrorMessage.INVALID_ARGUMENT);
    }

    this.#editor = editor;
    this.#name = name;
    this.#tag = tagName && this.editor.tags.get(tagName);
    this.#dialog = this.editor.dialogs.get(name);
    this.#dropdown = this.editor.dropdowns.get(name);
  }

  /**
   * Executes the command
   * @param {String} command
   * @param {HTMLElement} triggerElement
   * @return {void}
   */
  execute(command, triggerElement) {
    if (this.dialog) {
      const dialogs = this.editor.element.getElementsByTagName(TagName.DIALOG);
      dialogs.length > 0 ? this.dialog.cleanup() : this.openDialog(command);
      return;
    }

    if (this.dropdown) {
      const dropdowns = this.editor.element.getElementsByTagName(TagName.DROPDOWN);
      if (dropdowns.length > 0) {
        const dropdownCmd = dropdowns?.[0]?.dataset?.command;
        this.dropdown.cleanup();
        this.#cleanupAllDropdowns();
        if (dropdownCmd === command) {
          return;
        }
      }
      this.#cleanupAllDropdowns();
      this.openDropdown(command, triggerElement);
      return;
    }
    this.#cleanupAllDropdowns();

    this.insert(this.#selectedAttributes(command));
  }

  /**
   * Inserts element
   *
   * @param {Object.<string, string>} [attributes = {}]
   * @return {void}
   */
  insert(attributes = {}) {
    if (!this.tag) {
      return;
    }

    this.#filterAttributes(attributes);

    if (this.tag.group === TagGroup.FORMAT) {
      const sameTagNameElement = this.editor.dom.getSelectedElementByName(this.tag.name);
      if (sameTagNameElement) {
        const copiedText = this.editor.dom.createText(sameTagNameElement.textContent);
        sameTagNameElement.parentElement.replaceChild(copiedText, sameTagNameElement);
      } else {
        const newTagNameElement = this.editor.dom.createElement(this.tag.name, {
          attributes,
        });
        this.editor.dom.format(newTagNameElement);
      }
    } else {
      this.editor.dom.insert(this.editor.dom.createElement(this.tag.name, { attributes }));
    }
  }

  /**
   * Open dialog
   *
   * @return {void}
   */
  openDialog(command) {
    this.dialog?.open((attributes) => this.insert(attributes), this.#selectedAttributes());
  }

  /**
   * Open dropdown
   * @param {string} command
   * @param {HTMLElement} triggerElement
   * @return {void}
   */
  openDropdown(command, triggerElement) {
    this.dropdown?.open(
      (attributes) => this.insert(attributes),
      this.#selectedAttributes(command),
      triggerElement,
    );
  }

  /**
   * Returns attributes from selected element if its tag name matches configured tag name
   *
   * @return {Object.<string, string>}
   */
  #selectedAttributes(command) {
    if (!this.tag) {
      return {
        "data-command": command,
      };
    }

    const attributes = this.editor.dom.getSelectedAttributesByName(this.tag.name, command);
    this.#filterAttributes(attributes);

    return attributes;
  }

  /**
   * Filters allowed attributes
   *
   * @param {Object.<string, string>} attributes
   * @return {void}
   */
  #filterAttributes(attributes) {
    Object.keys(attributes).forEach(
      (item) => (this.tag.attributes.includes(item) && attributes[item]) || delete attributes[item],
    );
  }

  /**
   * Removes all existing editor dropdowns
   *
   * @return {void}
   */
  #cleanupAllDropdowns() {
    const dropdowns = document.getElementsByTagName(TagName.DROPDOWN);
    if (dropdowns.length > 0) {
      Array.from(dropdowns).forEach((item) => {
        item.classList.remove("dropdown-animate-in");
        item.classList.add("dropdown-animate-out");
        const thisParent = item.parentElement;
        if (thisParent) {
          thisParent?.removeChild(item);
          const { command } = item.dataset;
          const targetButton = thisParent.querySelector(`button[data-command=${command}]`);
          const arrowElement = Array.from(targetButton.children).find(
            (item) => item.className.indexOf("btn-arrow") > -1,
          );
          if (arrowElement) {
            arrowElement.classList.remove("up");
            arrowElement.classList.add("down");
          }
        }
      });
    }
  }
}
