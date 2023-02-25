import { ErrorMessage } from "../utils/Enum.js";

/**
 * Filter
 */
export default class Filter {
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
   * Initializes a new filter
   *
   * @param {Editor} editor
   */
  constructor(editor) {
    this.#editor = editor;
  }

  /**
   * Filters element
   *
   * @abstract
   * @param {HTMLElement} element
   * @return {void}
   */
  filter(element) {
    throw new Error(ErrorMessage.NOT_IMPLEMENTED);
  }
}
