import Plugin from "../../../core/Plugin.js";
import Break from "../../common/break/Break.js";
import ParagraphListener from "./ParagraphListener.js";
import { TagGroup, TagName } from "../../../utils/Enum.js";
import i18n from "./i18n.js";

/**
 * Paragraph Plugin
 */
export default class Paragraph extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "paragraph";
  }

  /**
   * @inheritDoc
   */
  static get dependencies() {
    return [Break];
  }

  /**
   * @inheritDoc
   */
  init() {
    this._i18n(i18n);
    this._tag({
      name: TagName.P,
      group: TagGroup.PARAGRAPH,
      command: this.constructor.name,
      attributes: ["class", "data-command"],
      children: [TagGroup.BREAK, TagGroup.FORMAT],
      editable: true,
      focusable: true,
      navigable: true,
      sortable: true,
      deletable: true,
      enter: TagName.P,
    });
    new ParagraphListener(this.editor);
    this._command(TagName.P);
    this._toolbar({
      label: this._("Paragraph"),
      command: this.constructor.name,
    });
  }
}
