import Plugin from "../../../core/Plugin.js";
import LinkDialog from "./LinkDialog.js";
import LinkListener from "./LinkListener.js";
import { Key, TagGroup, TagName } from "../../../utils/Enum.js";
import i18n from "./i18n.js";

/**
 * Link Plugin
 */
export default class Link extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "link";
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
      name: TagName.A,
      group: TagGroup.FORMAT,
      command: this.constructor.name,
      attributes: ["class", "data-command", "href"],
    });
    new LinkListener(this.editor);
    this.editor.dialogs.set(new LinkDialog(this.editor));
    this._command(TagName.A);
    this._toolbar({
      label: this._("Link"),
      command: this.constructor.name,
      key: Key.L,
    });
  }
}
