import Plugin from '../../../core/Plugin.js';
import Base from '../../../core/Base.js';
import SectionDialog from './SectionDialog.js';
import { TagGroup, TagName } from '../../../utils/Enum.js';
import i18n from './i18n.js';

/**
 * Section Plugin
 */
export default class Section extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'section';
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
            name: TagName.SECTION,
            group: TagGroup.CONTAINER,
            command: this.constructor.name,
            attributes: ['class', 'data-command'],
            children: [
                TagGroup.AUDIO,
                TagGroup.FIGURE,
                TagGroup.HEADING,
                TagGroup.IFRAME,
                TagGroup.IMAGE,
                TagGroup.LIST,
                TagGroup.PARAGRAPH,
                TagGroup.PREFORMAT,
                TagGroup.QUOTE,
                TagGroup.RULE,
                TagGroup.TABLE,
                TagGroup.VIDEO,
            ],
            arbitrary: true,
            deletable: true,
            focusable: true,
            navigable: true,
            slotable: true,
            sortable: true,
        });
        this.editor.dialogs.set(new SectionDialog(this.editor));
        this._command(TagName.SECTION);
        this._toolbar({
            label: this._('Section'),
            command: this.constructor.name
        });
    }
}
