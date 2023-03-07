import Listener from "./Listener.js";
import { TagName } from "../utils/Enum.js";

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
