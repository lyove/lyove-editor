/**
 * CoreEditor
 */
import CoreEditor from "./core/Editor.js";

/**
 * Menus plugins
 */
import Help from "./plugins/_menubar/help/Help.js";

/**
 * Toolbar plugins
 */
import Paragraph from "./plugins/_toolbar/paragraph/Paragraph.js";
import Heading from "./plugins/_toolbar/heading/Heading.js";
import FontSize from "./plugins/_toolbar/fontSize/FontSize.js";
import UnorderedList from "./plugins/_toolbar/unorderedList/UnorderedList.js";
import OrderedList from "./plugins/_toolbar/orderedList/OrderedList.js";
import Indent from "./plugins/_toolbar/indent/Indent.js";
import Align from "./plugins/_toolbar/align/Align.js";
import LineHeight from "./plugins/_toolbar/lineHeight/LineHeight.js";
import Blockquote from "./plugins/_toolbar/blockquote/Blockquote.js";
import Color from "./plugins/_toolbar/color/Color.js";
import Background from "./plugins/_toolbar/background/Background.js";
import Image from "./plugins/_toolbar/image/Image.js";
import Video from "./plugins/_toolbar/video/Video.js";
import Audio from "./plugins/_toolbar/audio/Audio.js";
import Table from "./plugins/_toolbar/table/Table.js";
import Preformat from "./plugins/_toolbar/preformat/Preformat.js";
import HorizontalRule from "./plugins/_toolbar/horizontalRule/HorizontalRule.js";
import Details from "./plugins/_toolbar/details/Details.js";
import Division from "./plugins/_toolbar/division/Division.js";
import Section from "./plugins/_toolbar/section/Section.js";
import Block from "./plugins/_toolbar/block/Block.js";
import Iframe from "./plugins/_toolbar/iframe/Iframe.js";

/**
 * Formatbar plugins
 */
import Bold from "./plugins/_formatbar/bold/Bold.js";
import Italic from "./plugins/_formatbar/italic/Italic.js";
import Underline from "./plugins/_formatbar/underline/Underline.js";
import Link from "./plugins/_formatbar/link/Link.js";
import Subscript from "./plugins/_formatbar/subscript/Subscript.js";
import Superscript from "./plugins/_formatbar/superscript/Superscript.js";
import Strong from "./plugins/_formatbar/strong/Strong.js";
import Strikethrough from "./plugins/_formatbar/strikethrough/Strikethrough.js";
import Insertion from "./plugins/_formatbar/insertion/Insertion.js";
import Deletion from "./plugins/_formatbar/deletion/Deletion.js";
import Small from "./plugins/_formatbar/small/Small.js";
import Emphasis from "./plugins/_formatbar/emphasis/Emphasis.js";
import Code from "./plugins/_formatbar/code/Code.js";
import Quote from "./plugins/_formatbar/quote/Quote.js";
import Cite from "./plugins/_formatbar/cite/Cite.js";
import Abbreviation from "./plugins/_formatbar/abbreviation/Abbreviation.js";
import Mark from "./plugins/_formatbar/mark/Mark.js";
import Keyboard from "./plugins/_formatbar/keyboard/Keyboard.js";
import Sample from "./plugins/_formatbar/sample/Sample.js";
import Variable from "./plugins/_formatbar/variable/Variable.js";
import Time from "./plugins/_formatbar/time/Time.js";
import Data from "./plugins/_formatbar/data/Data.js";
import Definition from "./plugins/_formatbar/definition/Definition.js";

/**
 * Focusbar plugins
 */
import Sort from "./plugins/_focusbar/sort/Sort.js";
import Delete from "./plugins/_focusbar/delete/Delete.js";

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
            ]
        }
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
                Help,
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
            ])
        }
    }
}
