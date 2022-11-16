import { Key, TagName } from "../../utils/Enum.js";

/**
 * Dropdown Element
 */
export default class DropdownElement extends HTMLElement {
  /**
   * Indicates dropdown state
   *
   * @return {boolean}
   */
  get open() {
    return this.getAttribute("open") === "true";
  }

  /**
   * Sets dropdown state
   *
   * @param {boolean} state
   * @return {void}
   */
  set open(state) {
    typeof state === "boolean" ? this.setAttribute("open", state) : this.removeAttribute("open");
  }

  /**
   * Initializes new dropdown element
   *
   * @borrows DropdownElement.connectedCallback
   */
  constructor() {
    super();
    this.addEventListener("keydown", (event) => event.key === Key.ESC && this.close());
    document.addEventListener("click", this.clickedOutside.bind(this));
  }

  /**
   * Runs when element is added to the DOM
   *
   * @return {void}
   */
  connectedCallback() {
    this.setAttribute("role", "dropdown");
    this.tabIndex = -1;
    this.focus();
  }

  /**
   * Shows dropdown and dispatches show event
   *
   * @return {void}
   */
  show(triggerElement, thisEditor) {
    this.open = false;
    this.dispatchEvent(
      new CustomEvent("show", {
        detail: {
          element: this,
          target: this,
        },
      }),
    );

    this.classList.add("dropdown-animate-in");

    // Insert into document first
    const editorRect = thisEditor.getBoundingClientRect();
    const triggerRect = triggerElement.getBoundingClientRect();
    const { left: eLeft, top: eTop } = editorRect;
    const { left: tLeft, top: tTop, width: tWidth, height: tHeight } = triggerRect;
    this.style.left = `${tLeft - eLeft - tWidth / 2}px`;
    this.style.top = `${tTop - eTop + tHeight}px`;
    thisEditor.appendChild(this);

    // Then calculate the position
    const dropRect = this.getBoundingClientRect();
    const { width: dWidth, left } = dropRect;
    const targetLeft = tLeft - eLeft + tWidth / 2 - dWidth / 2;
    this.style.left = `${left > 0 ? targetLeft : 0 - eLeft + 1}px`;

    // Arrow style
    if (left <= 0) {
      const arrow = Array.from(this.children).find((item) => item.role === "arrow");
      arrow.style.left = `${targetLeft - left}px`;
    }

    // Set opacity: 1
    this.open = true;

    // Finally remove class
    setTimeout(() => {
      this.classList.remove("dropdown-animate-in");
    }, 300);
  }

  /**
   * Closes dropdown and dispatches close event
   *
   * @return {void}
   */
  close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent("close", { detail: { element: this, target: this } }));
  }

  /**
   * Listen for document events
   * @param {event} event
   */
  clickedOutside(event) {
    const dropdowns = document.getElementsByTagName(TagName.DROPDOWN);
    if (dropdowns.length > 0) {
      const thisDropdown = dropdowns?.[0];
      const thisCommand = dropdowns?.[0]?.dataset?.command;
      let matched = false;
      const isTriggerBtn = (ele) => {
        if (ele) {
          if (ele.localName === "button" && ele.dataset.command === thisCommand) {
            matched = true;
            return true;
          } else {
            isTriggerBtn(ele.parentElement);
          }
        }
        return matched;
      };
      if (!(thisDropdown.contains(event.target) || isTriggerBtn(event.target))) {
        this.close();
      }
    }
  }
}
