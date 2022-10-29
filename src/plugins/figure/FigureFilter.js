import Filter from "../../core/Filter.js";
import { TagName } from "../../utils/Enum.js";

/**
 * Filters out figure elements with figcaption elements as only child
 */
export default class FigureFilter extends Filter {
  /**
   * @inheritDoc
   */
  filter(element) {
    element
      .querySelectorAll(`${TagName.FIGURE} > ${TagName.FIGCAPTION}:only-child`)
      .forEach((item) => item.parentElement.removeChild(item));
  }
}
