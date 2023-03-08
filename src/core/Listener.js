import { isFunction } from "../utils/util.js";

/**
 * Listener
 *
 * @implements EventListener
 */
export default class Listener {
  /**
   * Editor
   *
   */
  #editor;

  /**
   * Allows read access to editor
   *
   * @return {Editor}
   */
  get editor() {
    return this.#editor;
  }

  /**
   * Initializes a new listener
   *
   * @borrows Listener.handleEvent
   * @param {Editor} editor
   */
  constructor(editor) {
    this.#editor = editor;
  }

  /**
   * Handles events
   *
   * @param {Event} event
   * @return {void}
   */
  handleEvent(event) {
    if(isFunction(this[event.type])) {
      this[event.type](event);
    }
  }
}
