import Plugin from "../../../core/Plugin.js";
import { Key, TagGroup, TagName } from "../../../utils/Enum.js";
import i18n from "./i18n.js";

/**
 * Subscript Plugin
 */
export default class Subscript extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "subscript";
  }

  /**
   * @inheritDoc
   */
  static get dependencies() {
    return [];
  }

  /**
   * @inheritDoc
   */
  init() {
    this._i18n(i18n);
    this._tag({
      name: TagName.SUB,
      group: TagGroup.FORMAT,
      command: this.constructor.name,
      attributes: ["class", "data-command"],
    });
    this._command(TagName.SUB);
    this._formatbar({
      label: this._("subscript"),
      command: this.constructor.name,
      key: Key.X,
    });
  }
}
