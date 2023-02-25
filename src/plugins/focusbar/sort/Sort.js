import Plugin from "../../../core/Plugin.js";
import SortCommand from "./SortCommand.js";
import { Key, Sorting } from "../../../utils/Enum.js";
import i18n from "./i18n.js";

/**
 * Sort Plugin
 */
export default class Sort extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "sort";
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
    this._focusbar({
      label: this._("Trigger"),
      command: "trigger",
      key: "trigger",
      type: "toggle",
    });
    const sortings = {
      [Sorting.FIRST]: {
        label: this._("Sort to the beginning"),
        key: Key.HOME,
      },
      [Sorting.PREV]: {
        label: this._("Sort before previous element"),
        key: Key.UP,
      },
      [Sorting.NEXT]: {
        label: this._("Sort after next element"),
        key: Key.DOWN,
      },
      [Sorting.LAST]: { label: this._("Sort to the end"), key: Key.END },
    };
    Object.entries(sortings).forEach(([sorting, { label, key }]) => {
      const command = new SortCommand(this.editor, sorting);
      this.editor.commands.set(command);
      this._focusbar({
        label,
        command: command.name,
        key,
      });
    });
  }
}
