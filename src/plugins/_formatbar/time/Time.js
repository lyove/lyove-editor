import Base from '../../../core/Base.js';
import Plugin from '../../../core/Plugin.js';
import TimeDialog from './TimeDialog.js';
import { Key, TagGroup, TagName } from '../../../utils/Enum.js';
import i18n from './i18n.js';

/**
 * Time Plugin
 */
export default class Time extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'time';
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
            name: TagName.TIME, 
            group: TagGroup.FORMAT, 
            command: this.constructor.name,
            attributes: ['class', 'data-command', 'datetime'],
        });
        this.editor.dialogs.set(new TimeDialog(this.editor));
        this._command(TagName.TIME);
        this._formatbar({
            label: this._('Time'),
            command: this.constructor.name,
            key: Key.T
        });
    }
}
