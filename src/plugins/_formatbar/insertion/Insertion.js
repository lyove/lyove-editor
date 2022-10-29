import Base from "../../../core/Base.js";
import Plugin from "../../../core/Plugin.js";
import { Key, TagGroup, TagName } from "../../../utils/Enum.js";
import i18n from "./i18n.js";

/**
 * Insertion Plugin
 */
export default class Insertion extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "insertion";
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
      name: TagName.INS,
      group: TagGroup.FORMAT,
      command: this.constructor.name,
      attributes: ["class", "data-command"],
    });
    this._command(TagName.INS);
    this._formatbar({
      label: this._("Text Insertion"),
      command: this.constructor.name,
      key: Key.F,
    });
  }
}
