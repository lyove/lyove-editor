import Plugin from "../../../core/Plugin.js";
import Figure from "../../common/figure/Figure.js";
import AudioDialog from "./AudioDialog.js";
import AudioListener from "./AudioListener.js";
import { TagGroup, TagName } from "../../../utils/Enum.js";
import i18n from "./i18n.js";

/**
 * Audio Plugin
 */
export default class Audio extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "audio";
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
      name: TagName.AUDIO,
      group: TagGroup.AUDIO,
      command: this.constructor.name,
      attributes: ["class", "data-command", "controls", "id", "src"],
      empty: true,
      navigable: true,
    });
    new AudioListener(this.editor);
    this.editor.dialogs.set(
      new AudioDialog(this.editor, this.editor.config.customPlugins?.audio?.browser),
    );
    this._command(TagName.AUDIO);
    this._toolbox({
      label: this._("Audio"),
      command: this.constructor.name,
    });
  }
}
