import Plugin from "../../../core/Plugin.js";
import Base from "../../../core/Base.js";
import Break from "../../common/break/Break.js";
import TableCommand from "./TableCommand.js";
import TableDialog from "./TableDialog.js";
import TableFilter from "./TableFilter.js";
import TableListener from "./TableListener.js";
import { TagGroup, TagName } from "../../../utils/Enum.js";
import i18n from "./i18n.js";

/**
 * Table Plugin
 */
export default class Table extends Plugin {
  /**
   * @inheritDoc
   */
  static get name() {
    return "table";
  }

  /**
   * @inheritDoc
   */
  static get dependencies() {
    return [Base, Break];
  }

  /**
   * @inheritDoc
   */
  init() {
    this._i18n(i18n);
    this._tag({
      name: TagName.TABLE,
      group: TagGroup.TABLE,
      command: this.constructor.name,
      attributes: ["class", "data-command"],
      children: [TagGroup.TABLESECTION],
      editable: true,
      focusable: true,
      navigable: true,
      sortable: true,
      deletable: true,
    });
    this._tag(this.#section(TagName.THEAD));
    this._tag(this.#section(TagName.TBODY));
    this._tag(this.#section(TagName.TFOOT));
    this._tag({
      name: TagName.TR,
      group: TagGroup.TABLEROW,
      children: [TagGroup.TABLECELL],
    });
    this._tag(this.#cell(TagName.TH));
    this._tag(this.#cell(TagName.TD));
    new TableListener(this.editor);
    this.editor.filters.add(new TableFilter(this.editor));
    this.editor.dialogs.set(new TableDialog(this.editor));
    this.editor.commands.set(
      new TableCommand(this.editor, this.constructor.name, TagName.TABLE)
    );
    this._toolbar({
      label: this._("Table"),
      command: this.constructor.name,
    });
  }

  /**
   * Returns table section tag configuration
   *
   * @param {string} name
   * @return {Object.<string, any>}
   */
  #section(name) {
    return {
      name,
      group: TagGroup.TABLESECTION,
      children: [TagGroup.TABLEROW],
    };
  }

  /**
   * Returns table cell tag configuration
   *
   * @param {string} name
   * @return {Object.<string, any>}
   */
  #cell(name) {
    return {
      name,
      group: TagGroup.TABLECELL,
      children: [TagGroup.BREAK, TagGroup.FORMAT],
      editable: true,
      empty: true,
    };
  }
}
