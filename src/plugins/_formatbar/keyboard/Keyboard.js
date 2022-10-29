import Base from "../../../core/Base.js";
import Plugin from "../../../core/Plugin.js";
import { Key, TagGroup, TagName } from "../../../utils/Enum.js";
import i18n from "./i18n.js";

/**
 * Keyboard Plugin
 */
export default class Keyboard extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "keyboard";
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
      name: TagName.KBD,
      group: TagGroup.FORMAT,
      command: this.constructor.name,
      attributes: ["class", "data-command"],
    });
    this._command(TagName.KBD);
    this._formatbar({
      label: this._("User Input"),
      command: this.constructor.name,
      key: Key.K,
    });
  }
}
