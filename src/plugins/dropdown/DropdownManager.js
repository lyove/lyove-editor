import Dropdown from "./Dropdown.js";
import { ErrorMessage } from "../../utils/Enum.js";

/**
 * Dropdown Manager
 */
export default class DropdownManager {
  /**
   * Registered dropdowns
   *
   * @type {Map<string, Dropdown>}
   */
  #items = new Map();

  /**
   * Initializes a new dropdown manager
   *
   * @param {Dropdown[]} [dropdowns = []]
   */
  constructor(dropdowns = []) {
    dropdowns.forEach((dropdown) => this.set(dropdown));
  }

  /**
   * Returns registered dropdown with given name
   *
   * @param {string} name
   * @return {Dropdown|undefined}
   */
  get(name) {
    return this.#items.get(name);
  }

  /**
   * Adds or updates a dropdown
   *
   * @param {Dropdown} dropdown
   * @return {void}
   */
  set(dropdown) {
    if (!(dropdown instanceof Dropdown)) {
      throw new Error(ErrorMessage.INVALID_ARGUMENT);
    }

    this.#items.set(dropdown.name, dropdown);
  }

  /**
   * Freezes itself and its items
   */
  freeze() {
    this.#items.forEach((dropdown) => Object.freeze(dropdown));
    Object.freeze(this.#items);
    Object.freeze(this);
  }
}
