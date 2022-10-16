import Base from '../../../core/Base.js';
import Plugin from '../../../core/Plugin.js';
import { Key, TagGroup, TagName } from '../../../utils/Enum.js';
import i18n from './i18n.js';

/**
 * Emphasis Plugin
 */
export default class Emphasis extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'emphasis';
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
            name: TagName.EM, 
            group: TagGroup.FORMAT,
            command: this.constructor.name,
            attributes: ['class', 'data-command'],
        });
        this._command(TagName.EM);
        this._formatbar({
            label: this._('emphasized'),
            command: this.constructor.name,
            key: Key.E
        });
    }
}
