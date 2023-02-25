import Plugin from "../../../core/Plugin.js";
import FontSizeDropdown from "./FontSizeDropdown.js";
import FontSizeCommand from "./FontSizeCommand.js";
import Icons from "../../../icons/Icons.js";
import { TagGroup } from "../../../utils/Enum.js";
import { guid } from "../../../utils/util.js";
import i18n from "./i18n.js";

/**
 * FontSize Plugin
 */
export default class FontSize extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "fontSize";
  }

  /**
   * @inheritDoc
   */
  static get dependencies() {
    return [];
  }

  /**
   * dropdown items
   */
  static get sizeItems() {
    return [
      "12px",
      "13px",
      "14px",
      "15px",
      "16px",
      "18px",
      "22px",
      "24px",
      "28px",
      "32px",
      "36px",
      "40px",
      "42px",
      "48px",
    ];
  }

  /**
   * @inheritDoc
   */
  init() {
    this._i18n(i18n);
    this._toolbar({
      label: this._("FontSize"),
      command: this.constructor.name,
      arrowDown: Icons["arrow-down"],
      uuid: guid(),
    });
    this.editor.dropdowns.set(new FontSizeDropdown(this.editor));
    this.editor.commands.set(new FontSizeCommand(this.editor, TagGroup.FONTSIZE));
  }
}
