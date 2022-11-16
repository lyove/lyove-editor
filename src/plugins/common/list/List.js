import Plugin from "../../../core/Plugin.js";
import Base from "../../../core/Base.js";
import Break from "../break/Break.js";
import ListListener from "./ListListener.js";
import { TagGroup, TagName } from "../../../utils/Enum.js";

/**
 * List Plugin
 */
export default class List extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "list";
  }

  /**
   * @inheritDoc
   */
  static get dependencies() {
    return [Base, Break];
  }

  /**
   * @inheritDoc
   */
  init() {
    this._tag({
      name: TagName.LI,
      group: TagGroup.LISTITEM,
      command: this.constructor.name,
      attributes: ["class", "data-command"],
      children: [TagGroup.BREAK, TagGroup.FORMAT],
      deletable: true,
      editable: true,
      focusable: true,
      navigable: true,
      sortable: true,
      enter: TagName.LI,
    });
    new ListListener(this.editor);
  }
}
