import Command from '../../../core/Command.js';
import { TagName } from '../../../utils/Enum.js';

/**
 * Heading Command
 */
export default class HeadingCommand extends Command {
    /**
     * Initializes a new heading command
     *
     * @param {Editor} editor
     */
    constructor(editor, name, tagName) {
        super(editor, name, tagName);
    }

    /**
     * Inserts heading element
     *
     * @param {object} attributes
     * @return {void}
     */
    insert(attributes) {
        const command = attributes['data-command'];
        if(command && Object.values(TagName).includes(command)) {
            const targtElement = this.editor.dom.createElement(command, {
                attributes: {
                   class: command,
                   "data-command": command
               } 
           });
           this.editor.dom.insert(targtElement);
        }
    }
}
