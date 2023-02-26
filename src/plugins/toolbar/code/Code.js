import Plugin from "../../../core/Plugin.js";
import { Key, TagGroup, TagName } from "../../../utils/Enum.js";
import i18n from "./i18n.js";

/**
 * Code Plugin
 */
export default class Code extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "code";
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
      name: TagName.CODE,
      group: TagGroup.FORMAT,
      command: this.constructor.name,
      attributes: ["class", "data-command"],
    });
    this._command(TagName.CODE);
    this._toolbar({
      label: this._("Code"),
      command: this.constructor.name,
      key: Key.C,
    });
  }
}
