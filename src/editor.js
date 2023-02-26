/**
 * Core
 */
import Core from "./core";

/**
 * Menus plugins
 */
import Help from "./plugins/menubar/help/Help.js";

/**
 * Toolbox plugins
 */
import Paragraph from "./plugins/toolbox/paragraph/Paragraph.js";
import Heading from "./plugins/toolbox/heading/Heading.js";
import UnorderedList from "./plugins/toolbox/unorderedList/UnorderedList.js";
import OrderedList from "./plugins/toolbox/orderedList/OrderedList.js";
import Blockquote from "./plugins/toolbox/blockquote/Blockquote.js";
import Image from "./plugins/toolbox/image/Image.js";
import Video from "./plugins/toolbox/video/Video.js";
import Audio from "./plugins/toolbox/audio/Audio.js";
import Table from "./plugins/toolbox/table/Table.js";
import Preformat from "./plugins/toolbox/preformat/Preformat.js";
import HorizontalRule from "./plugins/toolbox/horizontalRule/HorizontalRule.js";
import Iframe from "./plugins/toolbox/iframe/Iframe.js";

/**
 * Toolbar plugins
 */
import FontSize from "./plugins/toolbar/fontSize/FontSize.js";
import Color from "./plugins/toolbar/color/Color.js";
import Background from "./plugins/toolbar/background/Background.js";
import Indent from "./plugins/toolbar/indent/Indent.js";
import Align from "./plugins/toolbar/align/Align.js";
import LineHeight from "./plugins/toolbar/lineHeight/LineHeight.js";
import Bold from "./plugins/toolbar/bold/Bold.js";
import Italic from "./plugins/toolbar/italic/Italic.js";
import Underline from "./plugins/toolbar/underline/Underline.js";
import Link from "./plugins/toolbar/link/Link.js";
import Subscript from "./plugins/toolbar/subscript/Subscript.js";
import Superscript from "./plugins/toolbar/superscript/Superscript.js";
import Strikethrough from "./plugins/toolbar/strikethrough/Strikethrough.js";
import Small from "./plugins/toolbar/small/Small.js";
import Code from "./plugins/toolbar/code/Code.js";
import Quote from "./plugins/toolbar/quote/Quote.js";
import Mark from "./plugins/toolbar/mark/Mark.js";

/**
 * Focusbar plugins
 */
import Sort from "./plugins/focusbar/sort/Sort.js";
import Delete from "./plugins/focusbar/delete/Delete.js";

/**
 * Editor
 */
export default class Editor extends Core {
  constructor(element, options = {}) {
    const config = {
      ...options,
      builtinPlugins: [
        // menubar
        Help,
        // toolbox
        Paragraph,
        Heading,
        OrderedList,
        UnorderedList,
        Blockquote,
        Image,
        Video,
        Audio,
        Table,
        Preformat,
        HorizontalRule,
        Iframe,
        // toolbar
        FontSize,
        Color,
        Background,
        Align,
        Indent,
        LineHeight,
        Bold,
        Italic,
        Underline,
        Strikethrough,
        Link,
        Subscript,
        Superscript,
        Quote,
        Small,
        Code,
        Mark,
        // focusbar
        Sort,
        Delete,
      ],
    };
    super(element, config);
  }

  /**
   * Returns editor content textarea element's innerHTML
   *
   * @return {string}
   */
  getHtml() {
    const textarea = this.dom.createElement(this.textarea.localName, {
      html: this.textarea.innerHTML,
    });
    this.filters.filter(textarea);
    this.textareaDispatcher.dispatch("gethtml", textarea);

    return textarea.innerHTML;
  }

  /**
   * Sets editor content textarea element's innerHTML
   *
   * @param {string} html
   * @return {void}
   */
  setHtml(html) {
    const textarea = this.dom.createElement(this.textarea.localName, { html });
    this.textareaDispatcher.dispatch("sethtml", textarea);
    this.filters.filter(textarea);
    this.textarea.innerHTML = textarea.innerHTML;
    if (!textarea.innerHTML) {
      this.textarea.appendChild(this.dom.createElement("p"));
    }
  }

  /**
   * Returns relative or absolute URL depending on its origin
   *
   * @param {string} url
   * @return {string}
   */
  setUrl(url) {
    const origin = this.dom.window.origin || this.dom.window.location.origin;
    /** @type {HTMLAnchorElement} */
    const a = this.dom.createElement("a", { attributes: { href: url } });

    return origin === a.origin ? a.pathname : a.href;
  }

  focus() {
    //
  }

  focusToEnd() {
    //
  }

  blur() {
    //
  }

  /**
   * Saves editor data to source element
   *
   * @return {void}
   */
  save() {
    if (this.originElement instanceof HTMLTextAreaElement) {
      this.originElement.value = this.getHtml();
    } else {
      this.originElement.innerHTML = this.getHtml();
    }

    this.textareaDispatcher.dispatch("save");
  }
}
