import Plugin from "../../../core/Plugin.js";
import FigureFilter from "./FigureFilter.js";
import FigureListener from "./FigureListener.js";
import { TagGroup, TagName } from "../../../utils/Enum.js";

/**
 * Figure Plugin
 */
export default class Figure extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "figure";
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
    this._tag({
      name: TagName.FIGURE,
      group: TagGroup.FIGURE,
      command: this.constructor.name,
      attributes: ["class", "data-command"],
      children: [
        TagGroup.AUDIO,
        TagGroup.CAPTION,
        TagGroup.IFRAME,
        TagGroup.IMAGE,
        TagGroup.PREFORMAT,
        TagGroup.QUOTE,
        TagGroup.TABLE,
        TagGroup.VIDEO,
      ],
      deletable: true,
      focusable: true,
      navigable: true,
      sortable: true,
    });
    this._tag({
      name: TagName.FIGCAPTION,
      group: TagGroup.CAPTION,
      children: [TagGroup.FORMAT],
      editable: true,
      navigable: true,
      enter: TagName.P,
    });
    new FigureListener(this.editor);
    this.editor.filters.add(new FigureFilter(this.editor));
  }
}
