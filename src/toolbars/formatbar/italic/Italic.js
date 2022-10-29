import Base from "../../../core/Base.js";
import Plugin from "../../../core/Plugin.js";
import { Key, TagGroup, TagName } from "../../../utils/Enum.js";
import i18n from "./i18n.js";

/**
 * Italic Plugin
 */
export default class Italic extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "italic";
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
      name: TagName.I,
      group: TagGroup.FORMAT,
      command: this.constructor.name,
      attributes: ["class", "data-command"],
    });
    this._command(TagName.I);
    this._formatbar({
      label: this._("italic"),
      command: this.constructor.name,
      key: Key.I,
    });
  }
}
