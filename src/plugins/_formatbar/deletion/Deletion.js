import Base from '../../../core/Base.js';
import Plugin from '../../../core/Plugin.js';
import { Key, TagGroup, TagName } from '../../../utils/Enum.js';
import i18n from './i18n.js';

/**
 * Deletion Plugin
 */
export default class Deletion extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'deletion';
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
            name: TagName.DEL, 
            group: TagGroup.FORMAT,
            command: this.constructor.name,
            attributes: ['class', 'data-command'],
        });
        this._command(TagName.DEL);
        this._formatbar({
            label: this._('Text Deletion'),
            command: this.constructor.name,
            key: Key.G
        });
    }
}
