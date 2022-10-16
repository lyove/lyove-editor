import Command from '../../../core/Command.js';
import { TextIndent } from '../../../utils/Enum.js';

/**
 * Indent Command
 */
export default class IndentCommand extends Command {
    /**
     * Initializes a new indent command
     *
     * @param {Editor} editor
     * @param {string} name
     */
    constructor(editor, name) {
        super(editor, name);
    }

    /**
     * Inserts indent style
     *
     * @param {object} attributes
     * @return {void}
     */
    insert(attributes) {
        const command = attributes["data-command"];
        const element = this.editor.dom.getSelectedElement();
        if (command && element) {
            element.style.textIndent = command === TextIndent.RIGHT ? "2rem" : 0;
        }
    }
}
