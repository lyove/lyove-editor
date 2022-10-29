import Plugin from "../../core/Plugin.js";
import Base from "../../core/Base.js";
import BreakFilter from "./BreakFilter.js";
import { TagGroup, TagName } from "../../utils/Enum.js";

/**
 * Break Plugin
 */
export default class Break extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "break";
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
  init() {
    this._tag({
      name: TagName.BR,
      group: TagGroup.BREAK,
      command: this.constructor.name,
      attributes: ["class", "data-command"],
      empty: true,
    });
    this.editor.filters.add(new BreakFilter(this.editor));
  }
}
