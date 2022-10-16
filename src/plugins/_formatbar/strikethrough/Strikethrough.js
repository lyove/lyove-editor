import Base from '../../../core/Base.js';
import Plugin from '../../../core/Plugin.js';
import { Key, TagGroup, TagName } from '../../../utils/Enum.js';
import i18n from './i18n.js';

/**
 * Strikethrough Plugin
 */
export default class Strikethrough extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'strikethrough';
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
            name: TagName.S, 
            group: TagGroup.FORMAT,
            command: this.constructor.name,
            attributes: ['class', 'data-command'],
        });
        this._command(TagName.S);
        this._formatbar({
            label: this._('strikethrough'),
            command: this.constructor.name,
            key: Key.R
        });
    }
}
