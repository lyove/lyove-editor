import Listener from "./Listener.js";
import { asyncFn } from "../utils/util.js";

/**
 * Focusable Listener
 */
export default class FocusableListener extends Listener {
  /**
   * @inheritDoc
   */
  constructor(editor) {
    super(editor);
    this.editor.textarea.addEventListener("focusin", this);
    this.editor.textarea.addEventListener("focusout", this);
    this.editor.dom.document.addEventListener("selectionchange", this);

    // async load
    asyncFn(() => this.editor.textarea.addEventListener("insert", this));
  }

  /**
   * Initializes elements
   *
   * @param {CustomEvent} event
   * @param {HTMLElement} event.detail.element
   * @return {void}
   */
  insert(event) {
    if (event.detail.element.hasAttribute("data-focusable")) {
      event.detail.element.focus();
    }
  }

  /**
   * Shows the focusbar on focusin if element is focusable
   *
   * @param {FocusEvent} event
   * @param {HTMLElement} event.target
   * @return {void}
   */
  focusin(event) {
    if (event.target instanceof HTMLElement && event.target.hasAttribute("data-focusable")) {
      const focusElement = event.target;
      const focusbarToolbox = Array.from(this.editor.focusbar.children).find(
        (e) => e.className === "trigger-content",
      );
      focusbarToolbox.hidden = true;
      this.#showFocusbar(focusElement);
    }
  }

  /**
   * Hides the focusbar on focusout
   *
   * @return {void}
   */
  focusout() {
    this.#hideFocusbar();
  }

  /**
   * Hides focusbar if current selection is not collapsed
   *
   * @return {void}
   */
  selectionchange() {
    const selection = this.editor.dom.getSelection();
    const element = this.editor.dom.getActiveElement();
    if (!selection.isCollapsed || !element) {
      this.#hideFocusbar();
    } else if (element instanceof HTMLElement && element.hasAttribute("data-focusable")) {
      this.#showFocusbar(element);
    }
  }

  /**
   * Shows the focusbar
   *
   * @param {HTMLElement} element
   * @return {void}
   */
  #showFocusbar(focusElement) {
    const { focusbar, textarea } = this.editor;
    if (!focusbar.children.length) {
      return;
    }

    Object.keys(focusElement.dataset).forEach(
      (key) => (focusbar.dataset[key] = focusElement.dataset[key]),
    );
    focusbar.dataset.tag = focusElement.localName;

    focusbar.hidden = false;
    const { x, y } = focusElement.getBoundingClientRect();
    const { x: tx, y: ty } = textarea.getBoundingClientRect();
    const diff = x - tx + focusbar.clientWidth - textarea.clientWidth;
    const top = y - ty - focusElement.scrollTop + textarea.offsetTop;
    let left = focusbar.clientWidth < textarea.clientWidth ? x - tx : 0;

    if (left > 0 && diff > 0) {
      left = left > diff ? (left - diff) / 2 : 0;
    }

    if (focusElement.localName === "li") {
      left -= 16;
    }

    focusbar.style.left = `${left - 20}px`;
    focusbar.style.top = `${top}px`;
  }

  /**
   * Hides the focusbar
   *
   * @return {void}
   */
  #hideFocusbar() {
    const { focusbar } = this.editor;
    focusbar.hidden = true;
    focusbar.removeAttribute("style");
    Object.keys(focusbar.dataset).forEach((key) => delete focusbar.dataset[key]);
  }
}
