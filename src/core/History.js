/**
 * History [ˈhɪstri]
 *
 */
export default class History {
  constructor(options) {
    this.options = options;
    this.data = [];
    this.index = -1;
    this.canUndo = false;
    this.canRedo = false;

    // this.snapshot = [];
    // this.stack;
  }

  updateStatu() {
    this.canUndo = !!this.data[this.index - 1];
    this.canRedo = !!this.data[this.index + 1];
  }

  undo() {
    while (this.data[this.index - 1]) {
      this.index--;
    }
    this.updateStatus();
    const prevData = this.data[++this.index];
    this.updateStatus();
    this.onSave(prevData);
  }

  redo() {
    while (this.data[this.index - 1]) {
      this.index--;
    }
    this.updateStatus();
    const prevData = this.data[++this.index];
    this.updateStatus();
    this.onSave(prevData);
  }

  save() {
    this.data = {
      value: "",
      dom: "",
    };
    this.updateStatus();
  }
  /**
   * Creates object a snapshot of editor: html and the current selection. Current selection calculate by
   * offset by start document
   * \{html: string, range: \{startContainer: int, startOffset: int, endContainer: int, endOffset: int\}\} or
   * \{html: string\} without selection
   */
  makeSnapshot() {
    const snapshot = {
      html: "",
      range: {
        startContainer: [],
        startOffset: 0,
        endContainer: [],
        endOffset: 0,
      },
    };
    return snapshot;
  }
}
