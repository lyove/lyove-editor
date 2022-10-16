import Base from '../../../core/Base.js';
import Plugin from '../../../core/Plugin.js';
import { Key, TagGroup, TagName } from '../../../utils/Enum.js';
import i18n from './i18n.js';

/**
 * Variable Plugin
 */
export default class Variable extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'variable';
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
            name: TagName.VAR, 
            group: TagGroup.FORMAT,
            command: this.constructor.name,
            attributes: ['class', 'data-command'],
        });
        this._command(TagName.VAR);
        this._formatbar({
            label: this._('Variable'),
            command: this.constructor.name,
            key: Key.V
        });
    }
}
