import BarListener from "./BarListener.js";

/**
 * Focusbar Listener
 */
export default class FocusbarListener extends BarListener {
  /**
   * @inheritDoc
   */
  constructor(editor) {
    super(editor);
    const { focusbar, textarea } = this.editor;
    focusbar.addEventListener("insertbutton", this);
    textarea.addEventListener("focusin", this);
    textarea.addEventListener("focusout", this);
    this.editor.dom.document.addEventListener("selectionchange", this);

    const focusbarTrigger = Array.from(focusbar.children).find(
      (e) => e.className === "trigger"
    );
    const focusbarToolbox = Array.from(focusbar.children).find(
      (e) => e.className === "trigger-content"
    );
    focusbarTrigger.addEventListener("click", (e) => {
      focusbarToolbox.hidden = !focusbarToolbox.hidden;
    });
  }

  /**
   * @inheritDoc
   */
  insertbutton(event) {
    super.insertbutton(event);

    if (event.detail.element.getAttribute("data-command")) {
      event.detail.element.addEventListener("mousedown", this);
    }
  }

  /**
   * Handles mousedown events
   *
   * @param {MouseEvent} event
   * @return {void}
   */
  mousedown(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * Shows the focusbar on focusin if element is focusable
   *
   * @param {FocusEvent} event
   * @param {HTMLElement} event.target
   * @return {void}
   */
  focusin(event) {
    if (
      event.target instanceof HTMLElement &&
      event.target.hasAttribute("data-focusable")
    ) {
      const focusElement = event.target;
      const focusbarToolbox = Array.from(this.editor.focusbar.children).find(
        (e) => e.className === "trigger-content"
      );
      focusbarToolbox.hidden = true;
      this.#show(focusElement);
    }
  }

  /**
   * Hides the focusbar on focusout
   *
   * @return {void}
   */
  focusout(event) {
    this.#hide();
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
      this.#hide();
    } else if (
      element instanceof HTMLElement &&
      element.hasAttribute("data-focusable")
    ) {
      this.#show(element);
    }
  }

  /**
   * Shows the focusbar
   *
   * @param {HTMLElement} element
   * @return {void}
   */
  #show(focusElement) {
    const { focusbar, textarea } = this.editor;
    if (!focusbar.children.length) {
      return;
    }

    Object.keys(focusElement.dataset).forEach(
      (key) => (focusbar.dataset[key] = focusElement.dataset[key])
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
  #hide() {
    const { focusbar } = this.editor;
    focusbar.hidden = true;
    focusbar.removeAttribute("style");
    Object.keys(focusbar.dataset).forEach(
      (key) => delete focusbar.dataset[key]
    );
  }
}
