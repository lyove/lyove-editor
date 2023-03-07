import Listener from "./Listener.js";

/**
 * Tag Listener
 */
export default class TagListener extends Listener {
  /**
   * @inheritDoc
   */
  constructor(editor) {
    super(editor);
    this.editor.textarea.addEventListener("insert", this);
  }

  /**
   * Initializes elements
   *
   * @param {CustomEvent} event
   * @param {HTMLElement} event.detail.element
   * @return {void}
   */
  insert(event) {
    const tag = this.editor.tags.get(event.detail.element);

    if (tag) {
      if (tag.editable) {
        event.detail.element.contentEditable = "true";
      }
      ["deletable", "focusable", "navigable", "sortable"].forEach((item) => {
        if (tag[item]) {
          event.detail.element.dataset[item] = "";
        }
      });
    }
  }
}
