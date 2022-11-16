import Plugin from "../../../core/Plugin.js";
import Base from "../../../core/Base.js";
import Figure from "../../common/figure/Figure.js";
import VideoDialog from "./VideoDialog.js";
import VideoListener from "./VideoListener.js";
import { TagGroup, TagName } from "../../../utils/Enum.js";
import i18n from "./i18n.js";

/**
 * Video Plugin
 */
export default class Video extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "video";
  }

  /**
   * @inheritDoc
   */
  static get dependencies() {
    return [Base, Figure];
  }

  /**
   * @inheritDoc
   */
  static get config() {
    return { browser: undefined };
  }

  /**
   * @inheritDoc
   */
  init() {
    this._i18n(i18n);
    this._tag({
      name: TagName.VIDEO,
      group: TagGroup.VIDEO,
      command: this.constructor.name,
      attributes: ["class", "data-command", "controls", "height", "id", "src", "width"],
      empty: true,
      navigable: true,
    });
    new VideoListener(this.editor);
    this.editor.dialogs.set(
      new VideoDialog(this.editor, this.editor.config.customPlugins?.video?.browser),
    );
    this._command(TagName.VIDEO);
    this._toolbar({
      label: this._("Video"),
      command: this.constructor.name,
    });
  }
}
