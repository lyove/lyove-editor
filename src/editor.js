/**
 * CoreEditor
 */
import CoreEditor from "./core/Editor.js";

/**
 * Menus plugins
 */
// import Help from "./toolbars/menubar/help/Help.js";

/**
 * Toolbar plugins
 */
import Paragraph from "./toolbars/toolbar/paragraph/Paragraph.js";
import Heading from "./toolbars/toolbar/heading/Heading.js";
import FontSize from "./toolbars/toolbar/fontSize/FontSize.js";
import UnorderedList from "./toolbars/toolbar/unorderedList/UnorderedList.js";
import OrderedList from "./toolbars/toolbar/orderedList/OrderedList.js";
import Indent from "./toolbars/toolbar/indent/Indent.js";
import Align from "./toolbars/toolbar/align/Align.js";
import LineHeight from "./toolbars/toolbar/lineHeight/LineHeight.js";
import Blockquote from "./toolbars/toolbar/blockquote/Blockquote.js";
import Color from "./toolbars/toolbar/color/Color.js";
import Background from "./toolbars/toolbar/background/Background.js";
import Image from "./toolbars/toolbar/image/Image.js";
import Video from "./toolbars/toolbar/video/Video.js";
import Audio from "./toolbars/toolbar/audio/Audio.js";
import Table from "./toolbars/toolbar/table/Table.js";
import Preformat from "./toolbars/toolbar/preformat/Preformat.js";
import HorizontalRule from "./toolbars/toolbar/horizontalRule/HorizontalRule.js";
import Details from "./toolbars/toolbar/details/Details.js";
import Division from "./toolbars/toolbar/division/Division.js";
import Section from "./toolbars/toolbar/section/Section.js";
import Block from "./toolbars/toolbar/block/Block.js";
import Iframe from "./toolbars/toolbar/iframe/Iframe.js";

/**
 * Formatbar plugins
 */
import Bold from "./toolbars/formatbar/bold/Bold.js";
import Italic from "./toolbars/formatbar/italic/Italic.js";
import Underline from "./toolbars/formatbar/underline/Underline.js";
import Link from "./toolbars/formatbar/link/Link.js";
import Subscript from "./toolbars/formatbar/subscript/Subscript.js";
import Superscript from "./toolbars/formatbar/superscript/Superscript.js";
import Strong from "./toolbars/formatbar/strong/Strong.js";
import Strikethrough from "./toolbars/formatbar/strikethrough/Strikethrough.js";
import Insertion from "./toolbars/formatbar/insertion/Insertion.js";
import Deletion from "./toolbars/formatbar/deletion/Deletion.js";
import Small from "./toolbars/formatbar/small/Small.js";
import Emphasis from "./toolbars/formatbar/emphasis/Emphasis.js";
import Code from "./toolbars/formatbar/code/Code.js";
import Quote from "./toolbars/formatbar/quote/Quote.js";
import Cite from "./toolbars/formatbar/cite/Cite.js";
import Abbreviation from "./toolbars/formatbar/abbreviation/Abbreviation.js";
import Mark from "./toolbars/formatbar/mark/Mark.js";
import Keyboard from "./toolbars/formatbar/keyboard/Keyboard.js";
import Sample from "./toolbars/formatbar/sample/Sample.js";
import Variable from "./toolbars/formatbar/variable/Variable.js";
import Time from "./toolbars/formatbar/time/Time.js";
import Data from "./toolbars/formatbar/data/Data.js";
import Definition from "./toolbars/formatbar/definition/Definition.js";

/**
 * Focusbar plugins
 */
import Sort from "./toolbars/focusbar/sort/Sort.js";
import Delete from "./toolbars/focusbar/delete/Delete.js";

/**
 * Editor
 */
export default class Editor extends CoreEditor {
  /**
   * Min config
   */
  static get minConfig() {
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
        Strong,
        Link,
        // focusbar
        Sort,
        Delete,
      ],
    };
  }

  /**
   * Default config
   */
  static get defaultConfig() {
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
   * Max config
   */
  static get maxConfig() {
    return {
      plugins: this.defaultConfig.plugins.concat([
        // menubar
        // Help,
        // toolbar
        Details,
        Division,
        Section,
        Block,
        Iframe,
        // formatbar
        Strong,
        Strikethrough,
        Insertion,
        Deletion,
        Small,
        Emphasis,
        Code,
        Cite,
        Mark,
        Keyboard,
        Sample,
        Variable,
        Time,
        Abbreviation,
        Data,
        Definition,
      ]),
    };
  }
}
