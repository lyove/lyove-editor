/**
 * Check value is window
 */
export function isWindow(obj) {
  return obj != null && obj === obj.window;
}

/**
 * Check value is String
 */
export function isString(value) {
  return typeof value === "string";
}

/**
 * Check if element is array
 */
export function isArray(elm) {
  return Array.isArray(elm);
}

/**
 * Check value is boolean data
 */
export function isBoolean(elm) {
  return typeof elm === "boolean";
}

/**
 * Check value is a number
 */
export function isNumber(value) {
  return typeof value === "number" && !isNaN(value);
}

/**
 * Check value has numeric format
 */
export function isNumeric(value) {
  if (isString(value)) {
    if (!value.match(/^([+-])?[0-9]+(\.?)([0-9]+)$/)) {
      return false;
    }

    value = parseFloat(value);
  }

  return typeof value === "number" && !isNaN(value);
}

/**
 * Check value is Function
 */
export function isFunction(value) {
  return typeof value === "function";
}

/**
 * Check if function or method was not replaced on some custom implementation
 */
export function isNativeFunction(f) {
  return (
    Boolean(f) &&
    (typeof f).toLowerCase() === "function" &&
    (f === Function.prototype ||
      /^\s*function\s*(\b[a-z$_][a-z0-9$_]*\b)*\s*\((|([a-z$_][a-z0-9$_]*)(\s*,[a-z$_][a-z0-9$_]*)*)\)\s*{\s*\[native code]\s*}\s*$/i.test(
        String(f),
      ))
  );
}

/**
 * Check if element is simple plaint object
 */
export function isPlainObject(obj) {
  if (!obj || typeof obj !== "object" || obj.nodeType || isWindow(obj)) {
    return false;
  }

  return !(obj.constructor && !{}.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf"));
}

/**
 * Check if value is promise
 */
export function isPromise(val) {
  return val && typeof val.then === "function";
}

/**
 * Check if a string is html or not
 */
export function isHTML(str) {
  return (
    isString(str) && /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/m.test(str.replace(/[\r\n]/g, ""))
  );
}

/**
 * Check if a string is a url
 */
export function isURL(str) {
  if (str.includes(" ")) {
    return false;
  }

  if (typeof URL !== "undefined") {
    try {
      const url = new URL(str);
      return ["https:", "http:", "ftp:", "file:", "rtmp:"].includes(url.protocol);
    } catch (e) {
      return false;
    }
  }

  const a = document.createElement("a");
  a.href = str;

  return Boolean(a.hostname);
}

/**
 * Check value is undefined or null
 */
export function isVoid(value) {
  return value === undefined || value === null;
}
