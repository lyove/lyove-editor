export default class Dom {
  /**
   * Returns true if it is a DOM node
   */
  static isNode(object) {
    // Duck-typing
    return Boolean(
      object &&
        typeof object.nodeName === "string" &&
        typeof object.nodeType === "number" &&
        object.childNodes &&
        typeof object.appendChild === "function",
    );
  }

  /**
   * Check if element is element node
   */
  static isElement(node) {
    if (!Dom.isNode(node)) {
      return false;
    }

    const win = node.ownerDocument?.defaultView;

    return Boolean(win && node.nodeType === Node.ELEMENT_NODE);
  }

  /**
   * Check if element is HTMLElement node
   */
  static isHTMLElement(node) {
    if (!Dom.isNode(node)) {
      return false;
    }

    const win = node.ownerDocument?.defaultView;

    return Boolean(win && node instanceof win.HTMLElement);
  }

  /**
   *  Check if element is table cell
   */
  static isCell(elm) {
    return Dom.isNode(elm) && /^(td|th)$/i.test(elm.nodeName);
  }

  /**
   * Check is element is Image element
   */
  static isImage(elm) {
    return Dom.isNode(elm) && /^(img|svg|picture|canvas)$/i.test(elm.nodeName);
  }

  /**
   * Check if element is text node
   */
  static isText(node) {
    return Boolean(node && node.nodeType === Node.TEXT_NODE);
  }

  /**
   * Check if element is document fragment
   */
  static isFragment(node) {
    if (!Dom.isNode(node)) {
      return false;
    }

    const win = node.ownerDocument?.defaultView;

    return Boolean(win && node.nodeType === Node.DOCUMENT_FRAGMENT_NODE);
  }

  /**
   * Insert newElement after element
   */
  static after(elm, newElement) {
    const { parentNode } = elm;

    if (!parentNode) {
      return;
    }

    if (parentNode.lastChild === elm) {
      parentNode.appendChild(newElement);
    } else {
      parentNode.insertBefore(newElement, elm.nextSibling);
    }
  }

  /**
   * Insert newElement before element
   */
  static before(elm, newElement) {
    const { parentNode } = elm;

    if (!parentNode) {
      return;
    }

    parentNode.insertBefore(newElement, elm);
  }

  /**
   * Insert newElement as first child inside element
   */
  static prepend(elm, newElement) {
    elm.insertBefore(newElement, elm.firstChild);
  }

  /**
   * Insert newElement as last child inside element
   */
  static append(root, newElement) {
    if (Array.isArray(newElement)) {
      newElement.forEach((node) => {
        this.append(root, node);
      });
    } else {
      root.appendChild(newElement);
    }
  }
}
