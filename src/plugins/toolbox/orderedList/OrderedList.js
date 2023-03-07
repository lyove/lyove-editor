import Plugin from "../../../core/Plugin.js";
import List from "../../common/list/List.js";
import { TagGroup, TagName } from "../../../utils/Enum.js";
import i18n from "./i18n.js";

/**
 * Ordered List Plugin
 */
export default class OrderedList extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "orderedList";
  }

  /**
   * @inheritDoc
   */
  static get dependencies() {
    return [List];
  }

  /**
   * @inheritDoc
   */
  init() {
    this._i18n(i18n);
    this._tag({
      name: TagName.OL,
      group: TagGroup.LIST,
      command: this.constructor.name,
      attributes: ["class", "data-command"],
      children: [TagGroup.LISTITEM],
      deletable: true,
      focusable: true,
      navigable: true,
      sortable: true,
    });
    this._command(TagName.OL);
    this._toolbox({
      label: this._("Ordered List"),
      command: this.constructor.name,
    });
  }
}
