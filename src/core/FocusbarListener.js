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
    this.editor.focusbar.addEventListener("insertbutton", this);

    const focusbarTrigger = Array.from(this.editor.focusbar.children).find(
      (e) => e.className === "trigger",
    );
    const focusbarToolbox = Array.from(this.editor.focusbar.children).find(
      (e) => e.className === "trigger-content",
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
}
