import Command from "../../../core/Command.js";
import Table from "./Table.js";
import { TagName } from "../../../utils/Enum.js";

/**
 * Table Command
 */
export default class TableCommand extends Command {
  /**
   * Initializes a new table command
   *
   * @param {Editor} editor
   */
  constructor(editor) {
    super(editor, Table.name, TagName.TABLE);
  }

  /**
   * Inserts table element
   *
   * @param {string} rows
   * @param {string} cols
   * @return {void}
   */
  insert({ rows, cols } = {}) {
    const table = this.editor.dom.createElement(TagName.TABLE, {
      attributes: { class: Table.name, "data-command": Table.name },
    });
    const tbody = this.editor.dom.createElement(TagName.TBODY);
    const r = parseInt(rows, 10) || 1;
    const c = parseInt(cols, 10) || 1;

    for (let i = 0; i < r; i++) {
      const tr = this.editor.dom.createElement(TagName.TR);
      tbody.appendChild(tr);

      for (let j = 0; j < c; ++j) {
        tr.appendChild(this.editor.dom.createElement(TagName.TD));
      }
    }

    table.appendChild(tbody);
    this.editor.dom.insert(table);
  }
}
