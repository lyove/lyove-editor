import Plugin from "../../../core/Plugin.js";
import { Key, TagGroup, TagName } from "../../../utils/Enum.js";
import i18n from "./i18n.js";

/**
 * Mark Plugin
 */
export default class Mark extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "mark";
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
      name: TagName.MARK,
      group: TagGroup.FORMAT,
      command: this.constructor.name,
      attributes: ["class", "data-command"],
    });
    this._command(TagName.MARK);
    this._toolbar({
      label: this._("mark"),
      command: this.constructor.name,
      key: Key.M,
    });
  }
}
