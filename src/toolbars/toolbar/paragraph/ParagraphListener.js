import Listener from "../../../core/Listener.js";
import { TagName } from "../../../utils/Enum.js";

/**
 * Handles paragraph elements
 */
export default class ParagraphListener extends Listener {
  /**
   * @inheritDoc
   */
  constructor(editor) {
    super(editor);
    this.editor.textarea.addEventListener("sethtml", this);
    this.editor.textarea.addEventListener("insertp", this);
  }

  /**
   * Initializes paragraph elements when editor html is set
   *
   * @param {CustomEvent} event
   * @param {HTMLElement} event.detail.element
   * @return {void}
   */
  sethtml(event) {
    Array.from(event.detail.element.getElementsByTagName(TagName.P)).forEach(
      (item) => this.#init(item)
    );
  }

  /**
   * Initializes elements
   *
   * @param {CustomEvent} event
   * @param {HTMLParagraphElement} event.detail.element
   * @return {void}
   */
  insertp(event) {
    this.#init(event.detail.element);
  }

  /**
   * Initializes paragraph element
   *
   * @param {HTMLParagraphElement} element
   * @return {void}
   */
  #init(element) {
    element.addEventListener("paste", this);
  }

  /**
   * Handles paste event
   *
   * @param {ClipboardEvent} event
   * @param {HTMLParagraphElement} event.target
   * @return {void}
   */
  paste(event) {
    this.editor.dom.window.setTimeout(() =>
      this.editor.filters.filter(event.target)
    );
  }
}
