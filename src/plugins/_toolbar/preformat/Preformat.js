import Plugin from '../../../core/Plugin.js';
import Base from '../../../core/Base.js';
import Break from '../../break/Break.js';
import PreformatFilter from './PreformatFilter.js';
import PreformatListener from './PreformatListener.js';
import { TagGroup, TagName } from '../../../utils/Enum.js';
import i18n from './i18n.js';

/**
 * Preformat Plugin
 */
export default class Preformat extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'preformat';
    }

    /**
     * @inheritDoc
     */
    static get dependencies() {
        return [Base, Break];
    }

    /**
     * @inheritDoc
     */
    init() {
        this._i18n(i18n);
        this._tag({
            name: TagName.PRE,
            group: TagGroup.PREFORMAT,
            command: this.constructor.name,
            attributes: ['class', 'data-command'],
            children: [TagGroup.BREAK],
            editable: true,
            focusable: true,
            navigable: true,
            sortable: true,
            deletable: true,
            enter: TagName.P,
        });
        new PreformatListener(this.editor);
        this._command(TagName.PRE);
        this._toolbar({
            label: this._('Preformatted Text'),
            command: this.constructor.name
        });
        this.editor.filters.add(new PreformatFilter(this.editor));
    }
}
