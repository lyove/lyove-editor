import Plugin from "../../../core/Plugin.js";
import Base from "../../../core/Base.js";
import HeadingDropdown from "./HeadingDropdown.js";
import HeadingCommand from "./HeadingCommand.js";
import Icons from "../../../icons/Icons.js";
import { TagGroup, TagName } from "../../../utils/Enum.js";
import { guid } from "../../../utils/util.js";
import i18n from "./i18n.js";

/**
 * Heading Plugin
 */
export default class Heading extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "heading";
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
  static get headingItems() {
    return ["H1", "H2", "H3", "H4", "H5", "H6"];
  }

  /**
   * @inheritDoc
   */
  init() {
    this._i18n(i18n);
    this._toolbar({
      label: this._("Heading"),
      command: this.constructor.name,
      arrowDown: Icons["arrow-down"],
      uuid: guid(),
    });
    const { headingItems } = this.constructor;
    headingItems.forEach((h) => {
      this._tag({
        name: TagName[h],
        group: TagGroup.HEADING,
        command: TagName[h],
        attributes: ["class", "data-command"],
        deletable: true,
        editable: true,
        focusable: true,
        sortable: true,
        enter: TagName.P,
      });
    });
    this.editor.dropdowns.set(new HeadingDropdown(this.editor, headingItems));
    this.editor.commands.set(new HeadingCommand(this.editor, TagGroup.HEADING));
  }
}
