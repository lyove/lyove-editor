import Plugin from "../../../core/Plugin.js";
import { Key, TagGroup, TagName } from "../../../utils/Enum.js";
import i18n from "./i18n.js";

/**
 * Small Plugin
 */
export default class Small extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "small";
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
      name: TagName.SMALL,
      group: TagGroup.FORMAT,
      command: this.constructor.name,
      attributes: ["class", "data-command"],
    });
    this._command(TagName.SMALL);
    this._formatbar({
      label: this._("small"),
      command: this.constructor.name,
      key: Key.W,
    });
  }
}
