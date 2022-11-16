import Command from "../../../core/Command.js";

/**
 * Align Command
 */
export default class AlignCommand extends Command {
  /**
   * Initializes a new align command
   *
   * @param {Editor} editor
   * @param {string} name
   */
  constructor(editor, name) {
    super(editor, name);
  }

  /**
   * Inserts align style
   *
   * @param {object} attributes
   * @return {void}
   */
  insert(attributes) {
    const command = attributes["data-command"];
    const element = this.editor.dom.getSelectedElement();
    if (command && element) {
      element.style.textAlign = command === "none" ? "" : command;
    }
  }
}
