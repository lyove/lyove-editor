import Dropdown from "../../../plugins/dropdown/Dropdown.js";
import Heading from "./Heading.js";
import { TagName } from "../../../utils/Enum.js";

/**
 * Heading Dropdown
 */
export default class HeadingDropdown extends Dropdown {
  /**
   * Initializes a new data dropdown
   *
   * @param {Editor} editor
   */
  constructor(editor) {
    super(editor, Heading.name);
  }

  /**
   * @inheritDoc
   */
  _prepareContent() {
    Heading.headingItems.forEach((h) => {
      const label = TagName[h];
      const command = TagName[h];
      const title = this._(h);
      const key = TagName[h];
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
    dropdown.addEventListener("click", (e) => this._onClick(e, execute, close));
  }

  /**
   * Click event
   * @param {*} event
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
        execute({ "data-command": command });
        typeof close === "function" && close();
      }
    }
  }
}
