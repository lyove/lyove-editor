import FontSize from "./FontSize.js";
import Dropdown from "../../dropdown/Dropdown.js";

/**
 * FontSize Dropdown
 */
export default class FontSizeDropdown extends Dropdown {
  /**
   * Initializes a new data dropdown
   *
   * @param {Editor} editor
   */
  constructor(editor) {
    super(editor, FontSize.name);
  }

  /**
   * @inheritDoc
   */
  _prepareContent() {
    FontSize.sizeItems.forEach((s) => {
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
    const { command } = e.target?.dataset;
    execute({ style: `font-size: ${command}` });
    close();
  }
}
