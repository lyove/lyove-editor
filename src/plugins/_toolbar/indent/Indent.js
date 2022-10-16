import Plugin from '../../../core/Plugin.js';
import Base from '../../../core/Base.js';
import IndentCommand from './IndentCommand.js';
import IndentDropdown from './IndentDropdown.js';
import Icons from "../../../icons/Icons.js";
import { TagGroup, TextIndent, Key } from '../../../utils/Enum.js';
import { guid } from '../../../utils/util.js';
import i18n from './i18n.js';

/**
 * Indent Plugin
 */
export default class Indent extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'indent';
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
            label: this._('Indent'),
            command: this.constructor.name,
            arrowDown: Icons['arrow-down'],
            uuid: guid(),
        });

        const textIndents = {
            [TextIndent.RIGHT]: { label: this._('Indent right'), key: `align-${Key.RIGHT}` },
            [TextIndent.LEFT]: { label: this._('Indent left'), key: `align-${Key.LEFT}` },
        };

        this.editor.dropdowns.set(new IndentDropdown(this.editor, textIndents));
        this.editor.commands.set(new IndentCommand(this.editor, TagGroup.INDENT));
    }
}
