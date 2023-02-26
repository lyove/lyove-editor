import Plugin from "../../../core/Plugin.js";
import { Key, TagGroup, TagName } from "../../../utils/Enum.js";
import i18n from "./i18n.js";

/**
 * Underline Plugin
 */
export default class Underline extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "underline";
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
      name: TagName.U,
      group: TagGroup.FORMAT,
      command: this.constructor.name,
      attributes: ["class", "data-command"],
    });
    this._command(TagName.U);
    this._toolbar({
      label: this._("underline"),
      command: this.constructor.name,
      key: Key.U,
    });
  }
}
