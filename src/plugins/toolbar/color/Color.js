import Base from "../../../core/Base.js";
import Plugin from "../../../core/Plugin.js";
import ColorDropdown from "./ColorDropdown.js";
import ColorCommand from "./ColorCommand.js";
import Icons from "../../../icons/Icons.js";
import { TagGroup } from "../../../utils/Enum.js";
import { guid } from "../../../utils/util.js";
import i18n from "./i18n.js";

/**
 * Color
 */
export default class Color extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "color";
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
  static get colorItems() {
    return [
      [
        { title: "黑色", color: "rgb(0, 0, 0)" },
        { title: "深灰3", color: "rgb(38, 38, 38)" },
        { title: "深灰2", color: "rgb(89, 89, 89)" },
        { title: "深灰1", color: "rgb(140, 140, 140)" },
        { title: "灰色", color: "rgb(191, 191, 191)" },
        { title: "浅灰4", color: "rgb(217, 217, 217)" },
        { title: "浅灰3", color: "rgb(233, 233, 233)" },
        { title: "浅灰2", color: "rgb(245, 245, 245)" },
        { title: "浅灰1", color: "rgb(250, 250, 250)", class: "border" },
        { title: "白色", color: "rgb(255, 255, 255)", class: "border" },
      ],
      [
        { title: "红色", color: "rgb(245, 34, 45)" },
        { title: "朱红", color: "rgb(250, 84, 28)" },
        { title: "橙色", color: "rgb(250, 140, 22)" },
        { title: "黄色", color: "rgb(250, 219, 20)" },
        { title: "绿色", color: "rgb(82, 196, 26)" },
        { title: "青色", color: "rgb(19, 194, 194)" },
        { title: "浅蓝", color: "rgb(24, 144, 255)" },
        { title: "蓝色", color: "rgb(47, 84, 235)" },
        { title: "紫色", color: "rgb(114, 46, 209)" },
        { title: "玫红", color: "rgb(235, 47, 150)" },
      ],
      [
        { title: "红色1", color: "rgb(255, 232, 230)" },
        { title: "朱红1", color: "rgb(255, 236, 224)" },
        { title: "橙色1", color: "rgb(255, 239, 209)" },
        { title: "黄色1", color: "rgb(252, 252, 202)" },
        { title: "绿色1", color: "rgb(228, 247, 210)" },
        { title: "青色1", color: "rgb(211, 245, 240)" },
        { title: "浅蓝1", color: "rgb(212, 238, 252)" },
        { title: "蓝色1", color: "rgb(222, 232, 252)" },
        { title: "紫色1", color: "rgb(239, 225, 250)" },
        { title: "玫红1", color: "rgb(250, 225, 235)" },
      ],
      [
        { title: "红色2", color: "rgb(255, 163, 158)" },
        { title: "朱红2", color: "rgb(255, 187, 150)" },
        { title: "橙色2", color: "rgb(255, 213, 145)" },
        { title: "黄色2", color: "rgb(255, 251, 143)" },
        { title: "绿色2", color: "rgb(183, 235, 143)" },
        { title: "青色2", color: "rgb(135, 232, 222)" },
        { title: "浅蓝2", color: "rgb(145, 213, 255)" },
        { title: "蓝色2", color: "rgb(173, 198, 255)" },
        { title: "紫色2", color: "rgb(211, 173, 247)" },
        { title: "玫红2", color: "rgb(255, 173, 210)" },
      ],
      [
        { title: "红色3", color: "rgb(255, 77, 79)" },
        { title: "朱红3", color: "rgb(255, 122, 69)" },
        { title: "橙色3", color: "rgb(255, 169, 64)" },
        { title: "黄色3", color: "rgb(255, 236, 61)" },
        { title: "绿色3", color: "rgb(115, 209, 61)" },
        { title: "青色3", color: "rgb(54, 207, 201)" },
        { title: "浅蓝3", color: "rgb(64, 169, 255)" },
        { title: "蓝色3", color: "rgb(89, 126, 247)" },
        { title: "紫色3", color: "rgb(146, 84, 222)" },
        { title: "玫红3", color: "rgb(247, 89, 171)" },
      ],
      [
        { title: "红色4", color: "rgb(207, 19, 34)" },
        { title: "朱红4", color: "rgb(212, 56, 13)" },
        { title: "橙色4", color: "rgb(212, 107, 8)" },
        { title: "黄色4", color: "rgb(212, 177, 6)" },
        { title: "绿色4", color: "rgb(56, 158, 13)" },
        { title: "青色4", color: "rgb(8, 151, 156)" },
        { title: "浅蓝4", color: "rgb(9, 109, 217)" },
        { title: "蓝色4", color: "rgb(29, 57, 196)" },
        { title: "紫色4", color: "rgb(83, 29, 171)" },
        { title: "玫红4", color: "rgb(196, 29, 127)" },
      ],
      [
        { title: "红色5", color: "rgb(130, 0, 20)" },
        { title: "朱红5", color: "rgb(135, 20, 0)" },
        { title: "橙色5", color: "rgb(135, 56, 0)" },
        { title: "黄色5", color: "rgb(97, 71, 0)" },
        { title: "绿色5", color: "rgb(19, 82, 0)" },
        { title: "青色5", color: "rgb(0, 71, 79)" },
        { title: "浅蓝5", color: "rgb(0, 58, 140)" },
        { title: "蓝色5", color: "rgb(6, 17, 120)" },
        { title: "紫色5", color: "rgb(34, 7, 94)" },
        { title: "玫红5", color: "rgb(120, 6, 80)" },
      ],
    ];
  }

  /**
   * @inheritDoc
   */
  init() {
    this._i18n(i18n);
    this._toolbar({
      label: this._("Color"),
      command: this.constructor.name,
      arrowDown: Icons["arrow-down"],
      uuid: guid(),
    });
    this.editor.dropdowns.set(new ColorDropdown(this.editor));
    this.editor.commands.set(new ColorCommand(this.editor, this.constructor.name, TagGroup.COLOR));
  }
}
