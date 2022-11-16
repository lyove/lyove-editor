import Base from "../../../core/Base.js";
import Plugin from "../../../core/Plugin.js";
import DataDialog from "./DataDialog.js";
import { Key, TagGroup, TagName } from "../../../utils/Enum.js";
import i18n from "./i18n.js";

/**
 * Data Plugin
 */
export default class Data extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "data";
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
      name: TagName.DATA,
      group: TagGroup.FORMAT,
      command: this.constructor.name,
      attributes: ["class", "data-command", "value"],
    });
    this.editor.dialogs.set(new DataDialog(this.editor));
    this._command(TagName.DATA);
    this._formatbar({
      label: this._("Data"),
      command: this.constructor.name,
      key: Key.J,
    });
  }
}
