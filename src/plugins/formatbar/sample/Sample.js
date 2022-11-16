import Base from "../../../core/Base.js";
import Plugin from "../../../core/Plugin.js";
import { Key, TagGroup, TagName } from "../../../utils/Enum.js";
import i18n from "./i18n.js";

/**
 * Sample Plugin
 */
export default class Sample extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "sample";
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
      name: TagName.SAMP,
      group: TagGroup.FORMAT,
      command: this.constructor.name,
      attributes: ["class", "data-command"],
    });
    this._command(TagName.SAMP);
    this._formatbar({
      label: this._("Sample Output"),
      command: this.constructor.name,
      key: Key.O,
    });
  }
}
