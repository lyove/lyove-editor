import { Key } from "../../utils/Enum.js";

/**
 * Dialog Element
 */
export default class DialogElement extends HTMLElement {
  /**
   * Indicates dialog state
   *
   * @return {boolean}
   */
  get open() {
    return this.getAttribute("open") === "true";
  }

  /**
   * Sets dialog state
   *
   * @param {boolean} state
   * @return {void}
   */
  set open(state) {
    typeof state === "boolean" ? this.setAttribute("open", state) : this.removeAttribute("open");
  }

  /**
   * Initializes new dialog element
   *
   * @borrows DialogElement.connectedCallback
   */
  constructor() {
    super();
    this.addEventListener("keydown", (event) => event.key === Key.ESC && this.close());
    this.addEventListener("click", (event) => event.target === this && this.close());
  }

  /**
   * Runs when element is added to the DOM
   *
   * @return {void}
   */
  connectedCallback() {
    this.setAttribute("role", "dialog");
    this.focus();
  }

  /**
   * Shows dialog and dispatches show event
   *
   * @return {void}
   */
  show() {
    this.open = true;
    this.dispatchEvent(
      new CustomEvent("show", {
        detail: {
          element: this,
          target: this,
        },
      }),
    );
  }

  /**
   * Closes dialog and dispatches close event
   *
   * @return {void}
   */
  close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent("close", { detail: { element: this, target: this } }));
  }
}
