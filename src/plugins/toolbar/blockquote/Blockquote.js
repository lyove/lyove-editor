import Plugin from "../../../core/Plugin.js";
import Break from "../../common/break/Break.js";
import BlockquoteFilter from "./BlockquoteFilter.js";
import { TagGroup, TagName } from "../../../utils/Enum.js";
import i18n from "./i18n.js";

/**
 * Blockquote Plugin
 */
export default class Blockquote extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "blockquote";
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
      name: TagName.BLOCKQUOTE,
      group: TagGroup.QUOTE,
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
    this._command(TagName.BLOCKQUOTE);
    this._toolbar({
      label: this._("Blockquote"),
      command: this.constructor.name,
    });
    this.editor.filters.add(new BlockquoteFilter(this.editor));
  }
}
