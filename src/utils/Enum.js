/**
 * Editor Mode
 *
 * @enum {string}
 */
export const EditorMode = Object.freeze({
  default: "defaultPlugins",
  min: "minPlugins",
  max: "maxPlugins",
});

/**
 * Tag Groups
 *
 * @enum {string}
 */
export const TagGroup = Object.freeze({
  ALIGN: "align",
  AUDIO: "audio",
  BACKGROUND: "background",
  BLOCK: "block",
  BREAK: "break",
  CAPTION: "caption",
  COLOR: "color",
  CONTAINER: "container",
  FIGURE: "figure",
  FORMAT: "format",
  FONTSIZE: "fontSize",
  HEADING: "heading",
  HELP: "help",
  IFRAME: "iframe",
  IMAGE: "image",
  INDENT: "indent",
  LINEHEIGHT: "lineHeight",
  LIST: "list",
  LISTITEM: "listitem",
  MENUBAR: "menubar",
  PARAGRAPH: "paragraph",
  PREFORMAT: "preformat",
  QUOTE: "quote",
  RULE: "rule",
  SLOT: "slot",
  SUMMARY: "summary",
  TABLE: "table",
  TABLECELL: "tablecell",
  TABLEROW: "tablerow",
  TABLESECTION: "tablesection",
  TEXTAREA: "textarea",
  VIDEO: "video",
});

/**
 * Tag Names
 *
 * @enum {string}
 */
export const TagName = Object.freeze({
  A: "a",
  ABBR: "abbr",
  ALL: "*",
  AUDIO: "audio",
  B: "b",
  BLOCK: "app-block",
  BLOCKQUOTE: "blockquote",
  BR: "br",
  BUTTON: "button",
  CITE: "cite",
  CODE: "code",
  DATA: "data",
  DEL: "del",
  DETAILS: "details",
  DFN: "dfn",
  DIALOG: "editor-dialog",
  DIV: "div",
  DROPDOWN: "editor-dropdown",
  EDITOR: "lyove-editor",
  EM: "em",
  FIELDSET: "fieldset",
  FIGCAPTION: "figcaption",
  FIGURE: "figure",
  FOCUSBAR: "editor-focusbar",
  FORM: "form",
  FORMATBAR: "editor-formatbar",
  H1: "h1",
  H2: "h2",
  H3: "h3",
  H4: "h4",
  H5: "h5",
  H6: "h6",
  HR: "hr",
  I: "i",
  IFRAME: "iframe",
  IMG: "img",
  INPUT: "input",
  INS: "ins",
  KBD: "kbd",
  LABEL: "label",
  LEGEND: "legend",
  LI: "li",
  MARK: "mark",
  MENUBAR: "editor-menubar",
  OL: "ol",
  OPTION: "option",
  P: "p",
  PRE: "pre",
  Q: "q",
  TEXTAREA: "editor-textarea",
  S: "s",
  SAMP: "samp",
  SECTION: "section",
  SELECT: "select",
  SLOT: "slot",
  SMALL: "small",
  SPAN: "span",
  STRONG: "strong",
  SUB: "sub",
  SUMMARY: "summary",
  SUP: "sup",
  TABLE: "table",
  TBODY: "tbody",
  TD: "td",
  TFOOT: "tfoot",
  TH: "th",
  THEAD: "thead",
  TIME: "time",
  TOOLBAR: "editor-toolbar",
  TR: "tr",
  U: "u",
  UL: "ul",
  VAR: "var",
  VIDEO: "video",
});

/**
 * Keys
 *
 * @enum {string}
 */
export const Key = Object.freeze({
  A: "a",
  B: "b",
  BACKSPACE: "Backspace",
  C: "c",
  D: "d",
  DEL: "Delete",
  DOWN: "ArrowDown",
  E: "e",
  END: "End",
  ENTER: "Enter",
  ESC: "Escape",
  F: "f",
  G: "g",
  H: "h",
  HOME: "Home",
  I: "i",
  J: "j",
  K: "k",
  L: "l",
  LEFT: "ArrowLeft",
  M: "m",
  N: "n",
  O: "o",
  P: "p",
  Q: "q",
  R: "r",
  RIGHT: "ArrowRight",
  S: "s",
  SPACE: " ",
  T: "t",
  TAB: "Tab",
  U: "u",
  UP: "ArrowUp",
  V: "v",
  W: "w",
  X: "x",
  Y: "y",
  Z: "z",
});

/**
 * DataType
 *
 * @enum {string}
 */
export const DataType = Object.freeze({
  FUNCTION: "function",
  STRING: "string",
  OBJECT: "object",
  ARRAY: "array",
  NUMBER: "number",
  BOOLEAN: "boolean",
  UNDEFINED: "undefined",
  NULL: "null",
});

/**
 * Error Message
 *
 * @enum {string}
 */
export const ErrorMessage = Object.freeze({
  INVALID_ARGUMENT: "Invalid argument",
  MISSING_NAME: "Missing name",
  NOT_IMPLEMENTED: "Not implemented",
});

/**
 * Alignment
 *
 * @enum {string}
 */
export const Alignment = Object.freeze({
  CENTER: "center",
  LEFT: "left",
  NONE: "none",
  RIGHT: "right",
});

/**
 * TextIndent
 *
 * @enum {string}
 */
export const TextIndent = Object.freeze({
  LEFT: "left",
  RIGHT: "right",
});

/**
 * Position
 *
 * @enum {string}
 */
export const Position = Object.freeze({
  AFTERBEGIN: "afterbegin",
  AFTEREND: "afterend",
  BEFOREBEGIN: "beforebegin",
  BEFOREEND: "beforeend",
});

/**
 * Sorting
 *
 * @enum {string}
 */
export const Sorting = Object.freeze({
  FIRST: "first",
  LAST: "last",
  NEXT: "next",
  PREV: "prev",
});
