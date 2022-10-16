import Plugin from '../../../core/Plugin.js';
import Base from '../../../core/Base.js';
import { TagGroup, TagName } from '../../../utils/Enum.js';
import i18n from './i18n.js';

/**
 * Horizontal Rule Plugin
 */
export default class HorizontalRule extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'horizontalRule';
    }

    /**
     * @inheritDoc
     */
    static get dependencies() {
        return [Base];
    }

    /**
     * @inheritDoc
     */
    init() {
        this._i18n(i18n);
        this._tag({
            name: TagName.HR,
            group: TagGroup.RULE,
            command: this.constructor.name,
            attributes: ['class', 'data-command'],
            deletable: true,
            empty: true,
            focusable: true,
            navigable: true,
            sortable: true,
        });
        this._command(TagName.HR);
        this._toolbar({
            label: this._('Horizontal Rule'),
            command: this.constructor.name
        });
    }
}
