import Filter from '../../../core/Filter.js';
import Preformat from './Preformat.js';
import { Position, TagName } from '../../../utils/Enum.js';

/**
 * Filters preformatted text
 */
export default class PreformatFilter extends Filter {
    /**
     * @inheritDoc
     */
    filter(element) {
        if (element instanceof HTMLElement
            && element.classList.contains(Preformat.name)
            && element.querySelector(':scope > ' + TagName.PRE)
            && !element.querySelector(':scope > ' + TagName.FIGCAPTION)
        ) {
            element.insertAdjacentElement(Position.BEFOREBEGIN, element.querySelector(':scope > ' + TagName.PRE));
            element.parentElement.removeChild(element);
        }
    }
}
