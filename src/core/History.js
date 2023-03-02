/**
 * History [ˈhɪstri]
 *
 */
export default class History {
  constructor(options) {
    this.options = options;
    this.data = [];
    this.index = -1;
    this.hasUndo = false;
    this.hasRedo = false;
  }

  updateStatu() {
    this.hasUndo = !!this.data[this.index - 1];
    this.hasRedo = !!this.data[this.index + 1];
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
}
