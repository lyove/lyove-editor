import BarListener from "./BarListener.js";

/**
 * Toolbar Listener
 */
export default class ToolbarListener extends BarListener {
  /**
   * @inheritDoc
   */
  constructor(editor) {
    super(editor);
    this.editor.toolbar.addEventListener("insertbutton", this);
    this.editor.dom.document.addEventListener("selectionchange", this);
  }

  /**
   * @inheritDoc
   */
  insertbutton(event) {
    super.insertbutton(event);
    event.detail.element.tabIndex =
      event.detail.element === this.editor.toolbar.firstElementChild ? 0 : -1;
    event.detail.element.addEventListener("keydown", this);
  }

  /**
   * Current selection
   *
   * @return {void}
   */
  selectionchange() {
    const editable = this.editor.dom.getSelectedEditable();
    const selection = this.editor.dom.getSelection();
  }
}
