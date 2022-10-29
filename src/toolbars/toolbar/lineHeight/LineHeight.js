import Plugin from "../../../core/Plugin.js";
import Base from "../../../core/Base.js";
import LineHeightDropdown from "./LineHeightDropdown.js";
import LineHeightCommand from "./LineHeightCommand.js";
import Icons from "../../../icons/Icons.js";
import { TagGroup } from "../../../utils/Enum.js";
import { guid } from "../../../utils/util.js";
import i18n from "./i18n.js";

/**
 * LineHeight Plugin
 */
export default class LineHeight extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "lineHeight";
  }

  /**
   * @inheritDoc
   */
  static get dependencies() {
    return [Base];
  }

  /**
   * dropdown items
   */
  static get heightItems() {
    return ["1", "1.15", "1.5", "2", "2.5", "3"];
  }

  /**
   * @inheritDoc
   */
  init() {
    this._i18n(i18n);
    this._toolbar({
      label: this._("LineHeight"),
      command: this.constructor.name,
      arrowDown: Icons["arrow-down"],
      uuid: guid(),
    });
    this.editor.dropdowns.set(new LineHeightDropdown(this.editor));
    this.editor.commands.set(
      new LineHeightCommand(this.editor, TagGroup.LINEHEIGHT)
    );
  }
}
