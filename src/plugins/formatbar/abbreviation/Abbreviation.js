import Base from "../../../core/Base.js";
import Plugin from "../../../core/Plugin.js";
import AbbreviationDialog from "./AbbreviationDialog.js";
import { Key, TagGroup, TagName } from "../../../utils/Enum.js";
import i18n from "./i18n.js";

/**
 * Abbreviation Plugin
 */
export default class Abbreviation extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "abbreviation";
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
      name: TagName.ABBR,
      group: TagGroup.FORMAT,
      command: this.constructor.name,
      attributes: ["class", "data-command", "title"],
    });
    this.editor.dialogs.set(new AbbreviationDialog(this.editor));
    this._command(TagName.ABBR);
    this._formatbar({
      label: this._("Abbreviation"),
      command: this.constructor.name,
      key: Key.A,
    });
  }
}
