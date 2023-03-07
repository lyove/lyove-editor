import { ErrorMessage } from "../utils/Enum.js";
import { isString } from "../utils/util.js";

/**
 * Tag
 */
export default class Tag {
  /**
   * Name
   *
   * @type {string}
   */
  name;

  /**
   * Name of the tag group
   *
   * @type {string}
   */
  group;

  /**
   * Allowed groups of child elements
   *
   * @type {string[]}
   */
  children;

  /**
   * Allowed attributes
   *
   * @type {string[]}
   */
  attributes;

  /**
   * Is element deletable
   *
   * @type {boolean}
   */
  deletable;

  /**
   * Is element editable
   *
   * @type {boolean}
   */
  editable;

  /**
   * Is element empty or allowed to be empty
   *
   * @type {boolean}
   */
  empty;

  /**
   * Should element be focused on insert
   *
   * @type {boolean}
   */
  focusable;

  /**
   * Is element navigable
   *
   * @type {boolean}
   */
  navigable;

  /**
   * Is element sortable
   *
   * @type {boolean}
   */
  sortable;

  /**
   * Element to insert when ENTER-key is pressed
   *
   * @type {string|undefined}
   */
  enter;

  /**
   * Defines a new tag
   *
   * @param {string} name
   * @param {string} group
   * @param {Object.<string, any>} [rest = {}]
   */
  constructor({ name, group, command, ...rest } = {}) {
    if (!isString(name) || !isString(group)) {
      throw new Error(ErrorMessage.INVALID_ARGUMENT);
    }

    this.name = name;
    this.group = group;
    this.command = command;
    this.children = rest.children || [];
    this.attributes = rest.attributes || [];
    this.editable = rest.editable === true;
    this.focusable = rest.focusable === true;
    this.navigable = rest.navigable === true;
    this.sortable = rest.sortable === true;
    this.deletable = rest.deletable === true;
    this.empty = rest.empty === true;
    this.enter = rest.enter;
  }
}
