import BarListener from "./BarListener.js";
import { Alignment, Key } from "../utils/Enum.js";
import { isKey } from "../utils/util.js";

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
    event.detail.element.addEventListener("keydown", this);
  }

  /**
   * Handles key combinations for alignment
   *
   * @param {KeyboardEvent} event
   * @param {HTMLElement} event.target
   * @return {void}
   */
  keydown(event) {
    const map = {
      [Key.UP]: Alignment.NONE,
      [Key.LEFT]: Alignment.LEFT,
      [Key.DOWN]: Alignment.CENTER,
      [Key.RIGHT]: Alignment.RIGHT,
    };

    if (event.target === event.currentTarget && isKey(event, Object.keys(map), { shift: true })) {
      event.preventDefault();
      event.stopPropagation();
      event.target.classList.remove(...Object.values(map));
      map[event.key] !== Alignment.NONE && event.target.classList.add(map[event.key]);
    }
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
