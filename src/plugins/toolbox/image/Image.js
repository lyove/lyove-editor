import Plugin from "../../../core/Plugin.js";
import ImageDialog from "./ImageDialog.js";
import ImageListener from "./ImageListener.js";
import Figure from "../../common/figure/Figure.js";
import { TagGroup, TagName } from "../../../utils/Enum.js";
import i18n from "./i18n.js";

/**
 * Image Plugin
 */
export default class Image extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "image";
  }

  /**
   * @inheritDoc
   */
  static get dependencies() {
    return [Figure];
  }

  /**
   * @inheritDoc
   */
  static get config() {
    return {};
  }

  /**
   * @inheritDoc
   */
  init() {
    this._i18n(i18n);
    this._tag({
      name: TagName.IMG,
      group: TagGroup.IMAGE,
      command: this.constructor.name,
      attributes: ["class", "data-command", "alt", "height", "id", "src", "width"],
      empty: true,
      navigable: true,
    });
    new ImageListener(this.editor);
    this.editor.dialogs.set(
      new ImageDialog(this.editor, this.editor.config.customPlugins?.image?.browser),
    );
    this._command(TagName.IMG);
    this._toolbox({
      label: this._("Image"),
      command: this.constructor.name,
    });
  }
}
