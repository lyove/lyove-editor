import Command from '../../../core/Command.js';
import { TagName } from '../../../utils/Enum.js';

/**
 * FontSize Command
 */
export default class FontSizeCommand extends Command {
    /**
     * Initializes a new font size command
     *
     * @param {Editor} editor
     */
    constructor(editor, name) {
        super(editor, name);
    }

    /**
     * Inserts color style
     *
     * @param {object} attributes
     * @return {void}
     */
    insert(attributes) {
        const range = this.editor.dom.getRange();
        if (range) {
            const selText = range.toString();
            range.deleteContents();
            const wrapElement = this.editor.dom.createElement(TagName.SPAN, { attributes });
            wrapElement.textContent = selText;
            range.insertNode(wrapElement);
        }
        const editable = this.editor.dom.getSelectedEditable();
        editable?.normalize();
    }
}
