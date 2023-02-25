import DeleteCommand from "./DeleteCommand.js";
import Plugin from "../../../core/Plugin.js";
import { Key } from "../../../utils/Enum.js";
import i18n from "./i18n.js";

/**
 * Delete Plugin
 */
export default class Delete extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "delete";
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
    this.editor.commands.set(new DeleteCommand(this.editor));
    this._focusbar({
      label: this._("Delete"),
      command: this.constructor.name,
      key: Key.DEL,
    });
  }
}
