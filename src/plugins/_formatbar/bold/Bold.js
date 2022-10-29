import Base from "../../../core/Base.js";
import Plugin from "../../../core/Plugin.js";
import { Key, TagGroup, TagName } from "../../../utils/Enum.js";
import i18n from "./i18n.js";

/**
 * Bold Plugin
 */
export default class Bold extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "bold";
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
      name: TagName.B,
      group: TagGroup.FORMAT,
      command: this.constructor.name,
      attributes: ["class", "data-command"],
    });
    this._command(TagName.B);
    this._formatbar({
      label: this._("bold"),
      command: this.constructor.name,
      key: Key.B,
    });
  }
}
