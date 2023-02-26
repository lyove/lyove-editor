import Plugin from "../../../core/Plugin.js";
import Figure from "../../common/figure/Figure.js";
import IframeDialog from "./IframeDialog.js";
import IframeListener from "./IframeListener.js";
import { TagGroup, TagName } from "../../../utils/Enum.js";
import i18n from "./i18n.js";

/**
 * Iframe Plugin
 */
export default class Iframe extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "iframe";
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
      name: TagName.IFRAME,
      group: TagGroup.IFRAME,
      command: this.constructor.name,
      attributes: ["class", "data-command", "allowfullscreen", "height", "id", "src", "width"],
      empty: true,
      navigable: true,
    });
    new IframeListener(this.editor);
    this.editor.dialogs.set(
      new IframeDialog(this.editor, this.editor.config.customPlugins?.iframe?.browser),
    );
    this._command(TagName.IFRAME);
    this._toolbox({
      label: this._("Iframe"),
      command: this.constructor.name,
    });
  }
}
