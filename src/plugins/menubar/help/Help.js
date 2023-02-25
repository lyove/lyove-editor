import Plugin from "../../../core/Plugin.js";
import HelpDropdown from "./HelpDropdown.js";
import Icons from "../../../icons/Icons.js";
import { TagGroup } from "../../../utils/Enum.js";
import { guid } from "../../../utils/util.js";
import i18n from "./i18n.js";

/**
 * Help menu
 */
export default class Help extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "help";
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
    this.editor.dropdowns.set(new HelpDropdown(this.editor));
    this._command(TagGroup.HELP);
    this._menubar({
      label: this._("help"),
      command: this.constructor.name,
      arrowDown: Icons["arrow-down"],
      uuid: guid(),
    });
  }
}
