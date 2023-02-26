import Filter from "../../../core/Filter.js";
import Blockquote from "./Blockquote.js";
import { Position, TagName } from "../../../utils/Enum.js";

/**
 * Filters blockquote
 */
export default class BlockquoteFilter extends Filter {
  /**
   * @inheritDoc
   */
  filter(element) {
    if (
      element instanceof HTMLElement &&
      element.classList.contains(Blockquote.name) &&
      element.querySelector(":scope > " + TagName.BLOCKQUOTE)
    ) {
      element.insertAdjacentElement(
        Position.BEFOREBEGIN,
        element.querySelector(":scope > " + TagName.BLOCKQUOTE),
      );
      element.parentElement.removeChild(element);
    }
  }
}
