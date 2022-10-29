import Listener from "../../../core/Listener.js";
import { TagName } from "../../../utils/Enum.js";

/**
 * Block listener to set API and CSS
 */
export default class BlockListener extends Listener {
  /**
   * @inheritDoc
   */
  constructor(editor) {
    super(editor);
    this.editor.textarea.addEventListener("sethtml", this);
    this.editor.textarea.addEventListener("insertappblock", this);
  }

  /**
   * Filters block elements without id when editor html is set
   *
   * @param {CustomEvent} event
   * @param {HTMLElement} event.detail.element
   * @return {void}
   */
  sethtml(event) {
    Array.from(
      event.detail.element.getElementsByTagName(TagName.BLOCK)
    ).forEach(
      /** @param {HTMLElement} item */
      (item) => item.id || item.parentElement.removeChild(item)
    );
  }

  /**
   * Removes block element if no id is set or sets block content from API if configured
   *
   * @param {CustomEvent} event
   * @param {BlockElement} event.detail.element
   * @return {Promise<void>}
   */
  async insertappblock(event) {
    if (!event.detail.element.id) {
      event.detail.element.parentElement.removeChild(event.detail.element);
      return;
    }

    if (!this.editor.config.customPlugins?.block.api) {
      return;
    }

    const url = this.editor.config.customPlugins?.block.api.replace(
      "{id}",
      event.detail.element.id
    );
    const response = await fetch(url, { mode: "no-cors" });

    if (!response.ok) {
      return;
    }

    let css = "";

    if (this.editor.config.customPlugins?.block.css) {
      css = this.editor.config.customPlugins?.block.css
        .split(",")
        .map((item) => `<link rel="stylesheet" href="${item}">`)
        .join("");
    }

    const content = await response.text();
    event.detail.element.content = css + content;
  }
}
