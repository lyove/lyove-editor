import Plugin from "../../../core/Plugin.js";
import Base from "../../../core/Base.js";
import BlockDialog from "./BlockDialog.js";
import BlockElement from "./BlockElement.js";
import BlockListener from "./BlockListener.js";
import { TagGroup, TagName } from "../../../utils/Enum.js";
import i18n from "../iframe/i18n.js";

/**
 * Block Plugin
 */
export default class Block extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "block";
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
  static get config() {
    return { api: undefined, browser: undefined, css: undefined };
  }

  /**
   * @inheritDoc
   */
  init() {
    this._i18n(i18n);
    this.editor.dom.registerElement(TagName.BLOCK, BlockElement);
    this._tag({
      name: TagName.BLOCK,
      group: TagGroup.BLOCK,
      command: this.constructor.name,
      attributes: ["class", "data-command", "id"],
      deletable: true,
      empty: true,
      focusable: true,
      navigable: true,
      sortable: true,
    });
    new BlockListener(this.editor);
    this.editor.dialogs.set(
      new BlockDialog(this.editor, this.editor.config.customPlugins?.block?.browser),
    );
    this._command(TagName.BLOCK);
    this._toolbar({
      label: this._("Block"),
      command: this.constructor.name,
    });
  }
}
