import Listener from "../../../core/Listener.js";
import Preformat from "./Preformat.js";

/**
 * Handles preformatted text elements
 */
export default class PreformatListener extends Listener {
  /**
   * @inheritDoc
   */
  constructor(editor) {
    super(editor);
    this.editor.textarea.addEventListener("insertpre", this);
    this.editor.textarea.addEventListener("deletepre", this);
  }

  /**
   * Initializes elements
   *
   * @param {CustomEvent} event
   * @param {HTMLPreElement} event.detail.element
   * @return {void}
   */
  insertpre(event) {
    //
  }

  /**
   * Removes parent figure element
   *
   * @param {CustomEvent} event
   * @param {HTMLElement} event.detail.target
   * @return {void}
   */
  deletepre(event) {
    if (event.detail.target.classList.contains(Preformat.name)) {
      event.detail.target.parentElement.removeChild(event.detail.target);
    }
  }
}
