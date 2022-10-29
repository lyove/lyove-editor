import Help from "./Help.js";
import Dropdown from "../../../plugins/dropdown/Dropdown.js";

/**
 * Help Dropdown
 */
export default class HelpDropdown extends Dropdown {
  /**
   * Initializes a new data dropdown
   *
   * @param {Editor} editor
   */
  constructor(editor) {
    super(editor, Help.name);
  }

  /**
   * @inheritDoc
   */
  _prepareContent() {
    [
      '<a href="https://github.com/lyove">Lyove-editor</a>',
      "List1",
      "List3",
    ].forEach((item) => {
      this.dropdownContent.addMenuItem(item, this._onClick);
    });
  }

  /**
   * Click event
   * @param {*} event
   */
  _onClick(event) {
    console.log(event);
  }
}
