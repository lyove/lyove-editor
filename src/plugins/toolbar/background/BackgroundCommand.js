import Command from "../../../core/Command.js";
import { TagName } from "../../../utils/Enum.js";

/**
 * Background Command
 */
export default class BackgroundCommand extends Command {
  /**
   * Initializes a new background command
   *
   * @param {Editor} editor
   */
  constructor(editor, name, tagName) {
    super(editor, name, tagName);
  }

  /**
   * Inserts background style
   *
   * @param {object} attributes
   * @return {void}
   */
  insert(attributes) {
    const range = this.editor.dom.getRange();
    if (range) {
      const selText = range.toString();
      range.deleteContents();
      const wrapElement = this.editor.dom.createElement(TagName.SPAN, {
        attributes,
      });
      wrapElement.textContent = selText;
      range.insertNode(wrapElement);
    }
    const editable = this.editor.dom.getSelectedEditable();
    editable?.normalize();
  }
}
