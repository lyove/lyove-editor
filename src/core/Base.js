// Plugin
import Plugin from "./Plugin.js";

// Listener
import AlignableListener from "./AlignableListener.js";
import DeletableListener from "./DeletableListener.js";
import EditableListener from "./EditableListener.js";
import FocusableListener from "./FocusableListener.js";
import FocusbarListener from "./FocusbarListener.js";
import FormatbarListener from "./FormatbarListener.js";
import NavigableListener from "./NavigableListener.js";
import SlotableListener from "./SlotableListener.js";
import SortableListener from "./SortableListener.js";
import TagListener from "./TagListener.js";
import TextareaListener from "./TextareaListener.js";
import ToolbarListener from "./ToolbarListener.js";
import MenubarListener from "./MenubarListener.js";

// ContentFilter
import ContentFilter from "./ContentFilter.js";

// Dialog
import DialogElement from "../plugins/dialog/DialogElement.js";

// Dropdown
import DropdownElement from "../plugins/dropdown/DropdownElement.js";

// i18n
import i18n from "./i18n.js";

// Utils
import { TagGroup, TagName } from "../utils/Enum.js";
import { asyncFn } from "../utils/util.js";

/**
 * Base Plugin
 */
export default class Base extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "base";
  }

  /**
   * @inheritDoc
   */
  static get config() {
    return { browser: {}, filter: {}, lang: "en", plugins: [] };
  }

  /**
   * @inheritDoc
   */
  init() {
    this._i18n(i18n);
    this.editor.dom.registerElement(TagName.DIALOG, DialogElement);
    this.editor.dom.registerElement(TagName.DROPDOWN, DropdownElement);
    this._tag({
      name: TagName.TEXTAREA,
      group: TagGroup.TEXTAREA,
      children: [
        TagGroup.AUDIO,
        TagGroup.BLOCK,
        // TagGroup.BREAK,
        TagGroup.CONTAINER,
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
    });
    this._tag({
      name: TagName.SLOT,
      group: TagGroup.SLOT,
      editable: true,
      focusable: true,
      navigable: true,
      sortable: true,
    });
    new TagListener(this.editor);
    new MenubarListener(this.editor);
    new ToolbarListener(this.editor);
    new FormatbarListener(this.editor);
    new FocusbarListener(this.editor);
    new EditableListener(this.editor);
    new DeletableListener(this.editor);
    new NavigableListener(this.editor);
    new SortableListener(this.editor);
    new AlignableListener(this.editor);
    new SlotableListener(this.editor);
    new TextareaListener(this.editor);
    this.editor.filters.add(new ContentFilter(this.editor));
    asyncFn(() => new FocusableListener(this.editor));
  }
}
