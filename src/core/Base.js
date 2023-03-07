import Plugin from "./Plugin";

// Listener
import DeletableListener from "./DeletableListener.js";
import EditableListener from "./EditableListener.js";
import FocusableListener from "./FocusableListener.js";
import FocusbarListener from "./FocusbarListener.js";
import MenubarListener from "./MenubarListener.js";
import NavigableListener from "./NavigableListener.js";
import SortableListener from "./SortableListener.js";
import TagListener from "./TagListener.js";
import TextareaListener from "./TextareaListener.js";
import ToolbarListener from "./ToolbarListener.js";
import ToolboxListener from "./ToolboxListener.js";

// ContentFilter
import ContentFilter from "./ContentFilter.js";

// Enum
import { TagGroup, TagName } from "../utils/Enum.js";

// i18n
import i18n from "./i18n.js";

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
  init() {
    // i18n
    this._i18n(i18n);

    // Textarea
    this._tag({
      name: TagName.TEXTAREA,
      group: TagGroup.TEXTAREA,
      children: [
        TagGroup.AUDIO,
        TagGroup.BREAK,
        TagGroup.CONTAINER,
        TagGroup.FIGURE,
        TagGroup.HEADING,
        TagGroup.IFRAME,
        TagGroup.IMAGE,
        TagGroup.LIST,
        TagGroup.PARAGRAPH,
        TagGroup.PREFORMAT,
        TagGroup.QUOTE,
        TagGroup.TABLE,
        TagGroup.VIDEO,
      ],
    });

    // Listener
    new DeletableListener(this.editor);
    new EditableListener(this.editor);
    new FocusableListener(this.editor);
    new FocusbarListener(this.editor);
    new MenubarListener(this.editor);
    new NavigableListener(this.editor);
    new SortableListener(this.editor);
    new TagListener(this.editor);
    new TextareaListener(this.editor);
    new ToolbarListener(this.editor);
    new ToolboxListener(this.editor);

    // content
    this.editor.filters.add(new ContentFilter(this.editor));
  }
}
