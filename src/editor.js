/**
 * CoreEditor
 */
import CoreEditor from "./core/Editor.js";

/**
 * Menus plugins
 */
// import Help from "./plugins/menubar/help/Help.js";

/**
 * Toolbar plugins
 */
import Paragraph from "./plugins/toolbar/paragraph/Paragraph.js";
import Heading from "./plugins/toolbar/heading/Heading.js";
import FontSize from "./plugins/toolbar/fontSize/FontSize.js";
import UnorderedList from "./plugins/toolbar/unorderedList/UnorderedList.js";
import OrderedList from "./plugins/toolbar/orderedList/OrderedList.js";
import Indent from "./plugins/toolbar/indent/Indent.js";
import Align from "./plugins/toolbar/align/Align.js";
import LineHeight from "./plugins/toolbar/lineHeight/LineHeight.js";
import Blockquote from "./plugins/toolbar/blockquote/Blockquote.js";
import Color from "./plugins/toolbar/color/Color.js";
import Background from "./plugins/toolbar/background/Background.js";
import Image from "./plugins/toolbar/image/Image.js";
import Video from "./plugins/toolbar/video/Video.js";
import Audio from "./plugins/toolbar/audio/Audio.js";
import Table from "./plugins/toolbar/table/Table.js";
import Preformat from "./plugins/toolbar/preformat/Preformat.js";
import HorizontalRule from "./plugins/toolbar/horizontalRule/HorizontalRule.js";
import Iframe from "./plugins/toolbar/iframe/Iframe.js";

/**
 * Formatbar plugins
 */
import Bold from "./plugins/formatbar/bold/Bold.js";
import Italic from "./plugins/formatbar/italic/Italic.js";
import Underline from "./plugins/formatbar/underline/Underline.js";
import Link from "./plugins/formatbar/link/Link.js";
import Subscript from "./plugins/formatbar/subscript/Subscript.js";
import Superscript from "./plugins/formatbar/superscript/Superscript.js";
import Strikethrough from "./plugins/formatbar/strikethrough/Strikethrough.js";
import Small from "./plugins/formatbar/small/Small.js";
import Code from "./plugins/formatbar/code/Code.js";
import Quote from "./plugins/formatbar/quote/Quote.js";
import Mark from "./plugins/formatbar/mark/Mark.js";

/**
 * Focusbar plugins
 */
import Sort from "./plugins/focusbar/sort/Sort.js";
import Delete from "./plugins/focusbar/delete/Delete.js";

/**
 * Editor
 */
export default class Editor extends CoreEditor {
  /**
   * Min plugins
   */
  static get minPlugins() {
    return {
      plugins: [
        // toolbar
        Paragraph,
        Heading,
        FontSize,
        Color,
        Background,
        OrderedList,
        UnorderedList,
        Indent,
        Align,
        LineHeight,
        Blockquote,
        Image,
        Video,
        Audio,
        Table,
        // formatbar
        Bold,
        Italic,
        Link,
        // focusbar
        Sort,
        Delete,
      ],
    };
  }

  /**
   * Default plugins
   */
  static get defaultPlugins() {
    return {
      plugins: [
        // toolbar
        Paragraph,
        Heading,
        FontSize,
        Color,
        Background,
        OrderedList,
        UnorderedList,
        Align,
        Indent,
        LineHeight,
        Blockquote,
        Image,
        Video,
        Audio,
        Table,
        Preformat,
        HorizontalRule,
        // formatbar
        Bold,
        Italic,
        Underline,
        Strikethrough,
        Link,
        Subscript,
        Superscript,
        Quote,
        // focusbar
        Sort,
        Delete,
      ],
    };
  }

  /**
   * Max plugins
   */
  static get maxPlugins() {
    return {
      plugins: this.defaultPlugins.plugins.concat([
        // menubar
        // Help,
        // toolbar
        Iframe,
        // formatbar
        Small,
        Code,
        Mark,
      ]),
    };
  }

  /**
   * Config
   */
  static get config() {
    return {
      lang: "en",
      plugins: [],
      browser: {},
      filter: {},
    };
  }
}
