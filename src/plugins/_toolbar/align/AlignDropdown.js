import Align from "./Align.js";
import Dropdown from "../../dropdown/Dropdown.js";

/**
 * Align Dropdown
 */
export default class AlignDropdown extends Dropdown {
  /**
   * Configured alignment
   *
   * @type {string}
   */
  #alignments;

  /**
   * Initializes a new data dropdown
   *
   * @param {Editor} editor
   */
  constructor(editor, alignments) {
    super(editor, Align.name);
    this.#alignments = alignments;
  }

  /**
   * @inheritDoc
   */
  _prepareContent() {
    Object.keys(this.#alignments).forEach((item) => {
      const command = `align-${item}`;
      const { label, key } = this.#alignments[item];
      const title = this._(label);
      const menuItem = this.dropdownContent.createButton({
        label,
        command,
        title,
        key,
        tip: true,
      });
      this.dropdownContent.addMenuItem(menuItem);
    });
  }

  /**
   * After the dropdown is created
   * @param {HTMLElement} dropdown
   * @param {HTMLElement} content
   * @param {function} execute
   */
  _readyContent(dropdown, content, execute, close) {
    const range = this.editor.dom.getRange();
    dropdown.addEventListener("click", (e) => {
      range && this.editor.dom.setRange(range);
      this._onClick(e, execute, close);
    });
  }

  /**
   * Handles click events
   *
   * @param {MouseEvent} event
   * @return {void}
   */
  _onClick(e, execute, close) {
    const getBarItem = (elm) => {
      if (elm.localName === "button") {
        return elm;
      } else if (elm?.parentElement) {
        return getBarItem(elm?.parentElement);
      } else {
        return undefined;
      }
    };
    const barItem = getBarItem(e.target);
    if (barItem) {
      const command = barItem?.getAttribute("data-command");
      if (command) {
        execute({ "data-command": command.split("-")[1] });
        typeof close === "function" && close();
      }
    }
  }
}
