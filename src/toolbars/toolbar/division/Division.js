import Plugin from "../../../core/Plugin.js";
import Base from "../../../core/Base.js";
import DivisionDialog from "./DivisionDialog.js";
import { TagGroup, TagName } from "../../../utils/Enum.js";
import i18n from "./i18n.js";

/**
 * Division Plugin
 */
export default class Division extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "division";
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
      name: TagName.DIV,
      group: TagGroup.CONTAINER,
      command: this.constructor.name,
      attributes: ["class", "data-command", "class"],
      children: [
        TagGroup.AUDIO,
        TagGroup.BLOCK,
        TagGroup.FIGURE,
        TagGroup.IFRAME,
        TagGroup.IMAGE,
        TagGroup.PREFORMAT,
        TagGroup.QUOTE,
        TagGroup.RULE,
        TagGroup.TABLE,
        TagGroup.VIDEO,
      ],
      arbitrary: true,
      deletable: true,
      focusable: true,
      navigable: true,
      slotable: true,
      sortable: true,
    });
    this.editor.dialogs.set(new DivisionDialog(this.editor));
    this._command(TagName.DIV);
    this._toolbar({
      label: this._("Division"),
      command: this.constructor.name,
    });
  }
}
