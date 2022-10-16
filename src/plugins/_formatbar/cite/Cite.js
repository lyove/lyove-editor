import Base from '../../../core/Base.js';
import Plugin from '../../../core/Plugin.js';
import { Key, TagGroup, TagName } from '../../../utils/Enum.js';
import i18n from './i18n.js';

/**
 * Cite Plugin
 */
export default class Cite extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'cite';
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
            name: TagName.CITE,
            group: TagGroup.FORMAT,
            command: this.constructor.name,
            attributes: ['class', 'data-command'],
        });
        this._command(TagName.CITE);
        this._formatbar({
            label: this._('Citation'),
            command: this.constructor.name,
            key: Key.Z
        });
    }
}
