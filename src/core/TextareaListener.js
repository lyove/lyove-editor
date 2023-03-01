import Listener from "./Listener.js";
import { TagName, Key } from "../utils/Enum.js";
import { isKey } from "../utils/util.js";

/**
 * Abstract Textarea Listener
 *
 * @abstract
 */
export default class TextareaListener extends Listener {
  /**
   * @inheritDoc
   */
  constructor(editor) {
    super(editor);
    this.editor.dom.document.addEventListener("selectionchange", this);
    this.editor.textarea.addEventListener("delete", this);
  }

  /**
   * Highlight toolbar item depending on current selection
   *
   * @return {void}
   */
  selectionchange() {
    const selctedElement = this.editor.dom.getSelectedElement();
    if (
      selctedElement &&
      (selctedElement.contentEditable === "true" ||
        selctedElement.parentElement.contentEditable === "true")
    ) {
      this.activeBarItem();
    }
  }

  /**
   * Remove nodes event
   *
   * @param {CustomEvent} event
   * @return {void}
   */
  delete(e) {
    const { onValueChange } = this.editor.config;
    if (typeof onValueChange === "function") {
      onValueChange(e?.currentTarget?.innerHTML, e);
    }
    if (e?.currentTarget?.innerHTML === "") {
      this.editor.textarea.appendChild(this.editor.dom.createElement(TagName.P));
    }
  }

  /**
   * Handles key combinations for navigation
   *
   * @param {KeyboardEvent} event
   * @param {HTMLElement} event.target
   * @return {void}
   */
  keydown(event) {
    if (isKey(event, [Key.LEFT, Key.RIGHT, Key.HOME, Key.END])) {
      const prev = event.target.previousElementSibling;
      const next = event.target.nextElementSibling;
      const first = event.target.parentElement.firstElementChild;
      const last = event.target.parentElement.lastElementChild;
      const isFirst = event.target === first;
      const isLast = event.target === last;

      if (event.key === Key.LEFT && !isFirst) {
        prev.focus();
      } else if (event.key === Key.RIGHT && !isLast) {
        next.focus();
      } else if (event.key === Key.HOME || (event.key === Key.RIGHT && isLast)) {
        first.focus();
      } else if (event.key === Key.END || (event.key === Key.LEFT && isFirst)) {
        last.focus();
      }

      event.preventDefault();
      event.stopPropagation();
    }
  }

  /**
   * Get command name by tag name
   * @param {*} tagName
   * @returns
   */
  getCommandNameByTagName(tagName) {
    const tagInst = this.editor.tags.get(tagName);
    return tagInst?.command;
  }

  /**
   * Activates the button of the formatting bar corresponding to the current selection
   *
   * @return {void}
   */
  activeBarItem() {
    const selection = this.editor.dom.getSelection();
    if (selection.type !== "None") {
      const range = selection.getRangeAt(0);
      let elem = range.commonAncestorContainer;
      if (elem.nodeType != 1) {
        elem = elem.parentNode;
      }
      const barItems = this.editor.toolbar.children;
      const commandName = this.getCommandNameByTagName(elem.localName);
      Array.prototype.forEach.call(barItems, (item) => {
        const itemDataKey = item.dataset.command;
        const eleDataKey = elem.dataset.command || commandName;
        if (elem.localName !== TagName.P && itemDataKey === eleDataKey) {
          item.setAttribute("data-active", true);
        } else {
          item.removeAttribute("data-active");
        }
      });
    }
  }
}
