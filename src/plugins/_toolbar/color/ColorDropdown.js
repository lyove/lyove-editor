import Color from "./Color.js";
import Dropdown from "../../dropdown/Dropdown.js";
import { TagName } from "../../../utils/Enum.js";

/**
 * Color Dropdown
 */
export default class ColorDropdown extends Dropdown {
  /**
   * Initializes a new data dropdown
   *
   * @param {Editor} editor
   */
  constructor(editor) {
    super(editor, Color.name);
  }

  /**
   * @inheritDoc
   */
  _prepareContent() {
    const color_groups = Color.colorItems;

    const colorboard = this.editor.dom.createElement(TagName.DIV, {
      attributes: { class: "colorboard" },
    });

    color_groups.forEach((group) => {
      const groupTag = this.editor.dom.createElement(TagName.SPAN, {
        attributes: { class: "colorboard-group" },
      });
      group.forEach((item) => {
        const itemTag = this.editor.dom.createElement(TagName.SPAN, {
          attributes: {
            class: `colorboard-group-item${item.class ? ` ${item.class}` : ""}`,
          },
        });
        const innerTag = this.editor.dom.createElement(TagName.SPAN, {
          attributes: { "data-color": item.color },
        });
        innerTag.style.backgroundColor = item.color;
        itemTag.appendChild(innerTag);
        groupTag.appendChild(itemTag);
      });
      colorboard.appendChild(groupTag);
    });

    this.dropdownContent.addHtmlElement(colorboard, {});
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
    const { color } = e.target?.dataset;
    execute({ style: `color: ${color}` });
    close();
  }
}
