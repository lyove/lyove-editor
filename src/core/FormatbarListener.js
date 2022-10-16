import BarListener from './BarListener.js';
import { TagGroup, ErrorMessage } from '../utils/Enum.js';

/**
 * Formatbar Listener
 */
export default class FormatbarListener extends BarListener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.formatbar.addEventListener('insertbutton', this);
        this.editor.dom.document.addEventListener('selectionchange', this);
    }

    /**
     * Shows or hides formatbar depending on current selection
     *
     * @return {void}
     */
    selectionchange() {
        const editable = this.editor.dom.getSelectedEditable();
		const selection = this.editor.dom.getSelection();

        if (
			editable
            && !selection.isCollapsed
            && this.editor.tags.allowed(editable, TagGroup.FORMAT, true)
        ) {
            this.#show(this.editor.formatbar, editable);
        } else {
            this.#hide(this.editor.formatbar);
        }
    }

    /**
     * Shows and positions toolbar for given element
     *
     * @protected
     * @param {HTMLElement} toolbar
     * @param {HTMLElement} element
     * @return {void}
     */
    #show(toolbar, element) {
        if (!(toolbar instanceof HTMLElement) || !(element instanceof HTMLElement)) {
            throw new Error(ErrorMessage.INVALID_ARGUMENT);
        }

        toolbar.hidden = false;
        const { x, y } = element.getBoundingClientRect();
        const { x: tx, y: ty } = this.editor.textarea.getBoundingClientRect();
        const diff = x - tx + toolbar.clientWidth - this.editor.textarea.clientWidth;
        const top = y - ty - element.scrollTop + this.editor.textarea.offsetTop - toolbar.clientHeight;
        let left = toolbar.clientWidth < this.editor.textarea.clientWidth ? x - tx : 0;

        if (left > 0 && diff > 0) {
            left = left > diff ? (left - diff) / 2 : 0;
        }
        
        toolbar.style.left = `${left}px`;
        toolbar.style.top = `${top - 4}px`;
    }

    /**
    * Hides toolbar
    *
    * @protected
    * @param {HTMLElement} toolbar
    * @return {void}
    */
    #hide(toolbar) {
        toolbar.hidden = true;
        toolbar.removeAttribute('style');
    }
}
