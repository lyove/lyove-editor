import Listener from "../../../core/Listener.js";
import { TagName } from "../../../utils/Enum.js";

/**
 * Creates missing figcaption elements
 */
export default class FigureListener extends Listener {
  /**
   * @inheritDoc
   */
  constructor(editor) {
    super(editor);
    this.editor.textarea.addEventListener("insertfigure", this);
  }

  /**
   * Initializes elements
   *
   * @param {CustomEvent} event
   * @param {HTMLElement} event.detail.element
   * @return {void}
   */
  insertfigure(event) {
    if (!event.detail.element.querySelector(":scope > " + TagName.FIGCAPTION)) {
      event.detail.element.appendChild(
        this.editor.dom.createElement(TagName.FIGCAPTION)
      );
    }
  }
}
