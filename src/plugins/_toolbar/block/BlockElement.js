/**
 * Block Element
 */
export default class BlockElement extends HTMLElement {
    /**
     * Returns shadow textarea innerHTML
     *
     * @return {string}
     */
    get content() {
        return this.shadowRoot.innerHTML;
    }

    /**
     * Sets shadow textareas innerHTML
     *
     * @param {string} val
     * @return {void}
     */
    set content(val) {
        this.shadowRoot.innerHTML = val;
    }

    /**
     * Initializes new block element
     */
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
}
