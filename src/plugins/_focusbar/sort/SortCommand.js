import Sort from './Sort.js';
import Command from '../../../core/Command.js';
import { ErrorMessage, Sorting } from '../../../utils/Enum.js';

/**
 * Sort Command
 */
export default class SortCommand extends Command {
    /**
     * Configured sorting
     *
     * @type {string}
     */
    #sorting;

    /**
     * Initializes a new sort command
     *
     * @param {Editor} editor
     * @param {string} sorting
     */
    constructor(editor, sorting) {
        const key = Object.entries(Sorting).find(([, val]) => val === sorting)?.[0].toLowerCase();

        if (!key) {
            throw new Error(ErrorMessage.INVALID_ARGUMENT);
        }

        super(editor, Sort.name + '-' + key);
        this.#sorting = sorting;
    }

    /**
     * @inheritDoc
     */
    execute() {
        const element = this.editor.dom.getActiveElement();

        if (element?.hasAttribute('data-sortable')) {
            this.editor.dom.sort(element, this.#sorting);
        }
    }
}
