import Plugin from '../../../core/Plugin.js';
import Base from '../../../core/Base.js';
import AlignCommand from './AlignCommand.js';
import AlignDropdown from './AlignDropdown.js';
import Icons from "../../../icons/Icons.js";
import { TagGroup, Key, Alignment } from '../../../utils/Enum.js';
import { guid } from '../../../utils/util.js';
import i18n from './i18n.js';

/**
 * Align Plugin
 */
export default class Align extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'align';
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
        this._toolbar({
            label: this._('Align'),
            command: this.constructor.name,
            arrowDown: Icons['arrow-down'],
            uuid: guid(),
        });

        const alignments = {
            [Alignment.NONE]: { label: this._('No alignment'), key: `${Key.UP} + ${Key.DOWN}` },
            [Alignment.LEFT]: { label: this._('Align left'), key: Key.LEFT },
            [Alignment.CENTER]: { label: this._('Align center'), key: `${Key.LEFT} + ${Key.RIGHT}` },
            [Alignment.RIGHT]: { label: this._('Align right'), key: Key.RIGHT },
        };

        this.editor.dropdowns.set(new AlignDropdown(this.editor, alignments));
        this.editor.commands.set(new AlignCommand(this.editor, TagGroup.ALIGN));
    }
}
