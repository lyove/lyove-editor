import LineHeight from "./LineHeight.js";
import Dropdown from "../../../plugins/dropdown/Dropdown.js";

/**
 * LineHeight Dropdown
 */
export default class LineHeightDropdown extends Dropdown {
  /**
   * Initializes a new data dropdown
   *
   * @param {Editor} editor
   */
  constructor(editor) {
    super(editor, LineHeight.name);
  }

  /**
   * @inheritDoc
   */
  _prepareContent() {
    LineHeight.heightItems.forEach((s) => {
      const label = s;
      const command = s;
      const title = this._(s);
      const key = s;
      const menuItem = this.dropdownContent.createButton({
        label,
        command,
        title,
        key,
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
    const command = e.target?.dataset?.command;
    execute({ style: `line-height: ${command}` });
    close();
  }
}
