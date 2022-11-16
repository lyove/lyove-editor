import BarListener from "./BarListener.js";

/**
 * Menubar Listener
 */
export default class MenubarListener extends BarListener {
  /**
   * @inheritDoc
   */
  constructor(editor) {
    super(editor);
    this.editor.menubar.addEventListener("insertbutton", this);
  }

  /**
   * @inheritDoc
   */
  insertbutton(event) {
    event.detail.element.addEventListener("click", this);
  }

  click(event) {
    const triggerElement = event.target.localName === "button" ? event.target : event.currentTarget;
    const command = triggerElement?.getAttribute("data-command");
    if (command) {
      this.editor.commands.execute(command, triggerElement);
    }
  }
}
