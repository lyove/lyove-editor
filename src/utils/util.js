import { DataType } from "./Enum.js";

/**
 * Indicates if keyboard event was triggered for given key combination
 *
 * @param {KeyboardEvent} event
 * @param {string|string[]} key
 * @param {boolean} alt
 * @param {boolean} ctrl
 * @param {boolean} shift
 * @return {boolean}
 */
export function isKey(
  event,
  key,
  { alt = false, ctrl = false, shift = false } = {}
) {
  return (
    ((Array.isArray(key) && key.includes(event.key)) || event.key === key) &&
    event.altKey === alt &&
    event.ctrlKey === ctrl &&
    event.shiftKey === shift
  );
}

/**
 * Indicates if given value is undefined
 *
 * @param {any} val
 * @return {boolean}
 */
export function not(val) {
  return typeof val === DataType.UNDEFINED;
}

/**
 * Indicates if given value is a function
 *
 * @param {any} val
 * @return {boolean}
 */
export function isFunction(val) {
  return typeof val === DataType.FUNCTION;
}

/**
 * Indicates if given value is a non-empty string
 *
 * @param {any} val
 * @return {boolean}
 */
export function isString(val) {
  return val && typeof val === DataType.STRING;
}

/**
 * Indicates if given value is a array
 *
 * @param {any} val
 * @return {boolean}
 */
export function isArray(val) {
  return val && Array.isArray(val);
}

/**
 * Indicates if given value is a object
 *
 * @param {any} val
 * @return {boolean}
 */
export function isObject(val) {
  return val && Object.prototype.toString.call(val) === "[object Object]";
}

/**
 * Indicates if given value is either undefined or a non-empty string
 *
 * @param {any} val
 * @return {boolean}
 */
export function isOptString(val) {
  return not(val) || isString(val);
}

/**
 * Indicates if given value is either undefined or a non-empty array
 *
 * @param {any} val
 * @return {boolean}
 */
export function isOptArray(val) {
  return not(val) || (Array.isArray(val) && val.length > 0);
}

/**
 * Indicates if given value is either undefined or an instance of HTMLElement
 *
 * @param {any} val
 * @return {boolean}
 */
export function isOptHtml(val) {
  return not(val) || val instanceof HTMLElement;
}

/**
 * Run a function asynchronously
 * @param {function} fn
 * @param {number} t
 */
export function asyncFn(fn = () => {}, t = 0) {
  if (typeof fn === "function") {
    setTimeout(fn, t);
  }
}

/**
 * Generate uuid
 * @returns {string}
 */
export function guid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
