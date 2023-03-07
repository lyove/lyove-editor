import BarListener from "./BarListener.js";

/**
 * Toolbox Listener
 */
export default class ToolboxListener extends BarListener {
  /**
   * @inheritDoc
   */
  constructor(editor) {
    super(editor);
    this.editor.toolbox.addEventListener("insertbutton", this);
  }

  /**
   * @inheritDoc
   */
  insertbutton(event) {
    super.insertbutton(event);
    event.detail.element.addEventListener("keydown", this);
  }
}
