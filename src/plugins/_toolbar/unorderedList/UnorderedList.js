import Plugin from '../../../core/Plugin.js';
import Base from '../../../core/Base.js';
import List from '../../list/List.js';
import { TagGroup, TagName } from '../../../utils/Enum.js';
import i18n from './i18n.js';

/**
 * Unordered List Plugin
 */
export default class UnorderedList extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'unorderedList';
    }

    /**
     * @inheritDoc
     */
    static get dependencies() {
        return [Base, List];
    }

    /**
     * @inheritDoc
     */
    init() {
        this._i18n(i18n);
        this._tag({
            name: TagName.UL,
            group: TagGroup.LIST,
            command: this.constructor.name,
            attributes: ['class', 'data-command'],
            children: [TagGroup.LISTITEM],
            arbitrary: true,
            deletable: true,
            focusable: true,
            navigable: true,
            sortable: true,
        });
        this._command(TagName.UL);
        this._toolbar({
            label: this._('Unordered List'),
            command: this.constructor.name
        });
    }
}
