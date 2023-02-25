import Plugin from "../../../core/Plugin.js";
import { Key, TagGroup, TagName } from "../../../utils/Enum.js";
import i18n from "./i18n.js";

/**
 * Superscript Plugin
 */
export default class Superscript extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "superscript";
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
      name: TagName.SUP,
      group: TagGroup.FORMAT,
      command: this.constructor.name,
      attributes: ["class", "data-command"],
    });
    this._command(TagName.SUP);
    this._formatbar({
      label: this._("superscript"),
      command: this.constructor.name,
      key: Key.Y,
    });
  }
}
