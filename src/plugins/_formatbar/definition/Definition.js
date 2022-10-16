import Base from '../../../core/Base.js';
import Plugin from '../../../core/Plugin.js';
import DefinitionDialog from './DefinitionDialog.js';
import { Key, TagGroup, TagName } from '../../../utils/Enum.js';
import i18n from './i18n.js';

/**
 * Definition Plugin
 */
export default class Definition extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'definition';
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
            name: TagName.DFN, 
            group: TagGroup.FORMAT,
            command: this.constructor.name,
            attributes: ['class', 'data-command', 'title'],
        });
        this.editor.dialogs.set(new DefinitionDialog(this.editor));
        this._command(TagName.DFN);
        this._formatbar({
            label: this._('Definition'),
            command: this.constructor.name,
            key: Key.D
        });
    }
}
