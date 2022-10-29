import Base from "../../../core/Base.js";
import Plugin from "../../../core/Plugin.js";
import { Key, TagGroup, TagName } from "../../../utils/Enum.js";
import i18n from "./i18n.js";

/**
 * Strong Plugin
 */
export default class Strong extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "strong";
  }

  /**
   * @inheritDoc
   */
  static get dependencies() {
    return [Base];
  }

  /**
   * @inheritDoc
   */
  init() {
    this._i18n(i18n);
    this._tag({
      name: TagName.STRONG,
      group: TagGroup.FORMAT,
      command: this.constructor.name,
      attributes: ["class", "data-command"],
    });
    this._command(TagName.STRONG);
    this._formatbar({
      label: this._("strongly emphasized"),
      command: this.constructor.name,
      key: Key.S,
    });
  }
}
