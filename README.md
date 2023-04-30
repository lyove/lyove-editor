<div align="center">
  <br />
  <a href="https://github.com/lyove/editor">
    <img width="100" src="https://raw.githubusercontent.com/lyove/editor/master/public/logo.svg" alt="Logo of Lyove-Editor">
  </a>
  <br />
</div>

# lyove editor
  
<a href="https://github.com/lyove/editor/actions">
  <img alt="Status" src="https://github.com/lyove/editor/workflows/build-test/badge.svg">
</a>
<span>&nbsp;</span>
<a href="https://github.com/lyove/editor/releases">
  <img alt="version" src="https://img.shields.io/github/v/release/lyove/editor?include_prereleases&label=version&logo=github&logoColor=white">
</a>
<span>&nbsp;</span>
<a href="https://lyove.github.io/editor">
  <img alt="docs" src="https://img.shields.io/badge/documentation-online-blue?logo=readthedocs&logoColor=white">
</a>

A HTML standards-compliant and dependency-free rich text editor.

## Demo

https://lyove.github.io/editor

## Development

To build the editor run

```
npm run build
```

To start the demo locally run either

```
npm run dev
```

In both cases the demo is accessible at http://localhost:3000/

## Features

### Toolbar navigation

Once a toolbar button is focused, use the `ArrowLeft`, `ArrowRight`, `Home` and `End` keys to navigate among the
buttons.

### Navigable elements

If one *navigable* element is focused, you can use the `ArrowUp`, `ArrowDown`, `Home` and `End` keys to navigate among
the sibling elements.

### `Enter` key handling

After adding the first widget into the content area, you can also use the `Enter` key to add a new paragraph. Depending
on the widget, this new paragraph will be created inside the widget itself or on top-level. Within lists, the `Enter`
key will add a new list item.

### Sortable elements

You can reorder *sortable* elements either by drag'n'drop or by keyboard shortcuts.

You can move the *sortable* element before its previous or after its next sibling or to first or last position by
combining the `Control` key with one of the `ArrowUp`, `ArrowDown`, `Home` or `End` keys.

### Deletable elements

You can delete a *deletable* element by combining the `Control` key with the `Delete` key. Inside editable elements, you
can also use the `Backspace` key, if the editable is empty. Note that not all elements are configured to be deletable,
p.e. the *details* widget will not allow to delete the *summary* element unless it is the only child in which case
deleting the *summary* element will delete the whole *details* widget.

### Table widget keyboard shortcuts

The keyboard shortcuts within a table slightly differ due to the nature of table elements. Navigating, sorting, adding
and deleting shortcuts use the **arrow keys** `ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`. Note that sorting,
adding and deleting take the table section (`thead`, `tbody`, `tfoot`) into account.

To navigate among the cells and rows use one of the **arrow keys**.

To sort a table row/column combine the `Control` key with one of the **arrow keys**.

To add a new row/column before/after the currently focused table cell combine the `Alt` key with one of the **arrow
keys**.

To delete the row/column before/after the currently focused table cell combine the `Alt` and `Shift` keys with one of
the **arrow keys**.

### Text-level elements

Each formatting command registers a keyboard shortcut in the form `Alt` + `Shift` + a letter. If you hover a toolbar
button for such a text-level element, the actual keyboard shortcut will be shown. Using such a shortcut will execute the
corresponding command. 

In addition to that, you can also doubleclick on a text-level element to execute the corresponding command.

In both cases, executing the command will either open the corresponding dialog in case the elements allows attributes or
remove the formatting text-level element.

## Usage

```js
import Editor from './lyove-editor.js';
import './lyove-editor.css'

const rte = document.getElementById("rich_text_editor");
```

```js
Editor.create(rte, {
    lang: "en",
});
```

**Config plugins**
```js
Editor.create(rte, {
    lang: "en",
    plugins: ['help', 'heading', 'paragraph', 'bold', 'sort'],
});
```

**Custom plugins**
```js
Editor.create(rte, {
    lang: "en",
    customPlugins: {
        audio: {
            browser: "browser/audio.html",
        },
        block: {
            api: "api/{id}.html",
            browser: "browser/block.html",
            css: "css/app.css",
        },
        iframe: {
            browser: "browser/iframe.html",
        },
        image: {
            browser: "browser/image.html",
        },
        video: {
            browser: "browser/video.html",
        },
    },
});

```

**More config**
```js
/**
 * Configuration options
 */
const config = {
    /**
     * Base plugin
     * =============================================
     */

    /**
     * Overrides default browser dialog window options
     *
     * @see BrowserManager.#opts
     * @type {Object.<string, string>}
     */
    browser: {},

    /**
     * Converts one HTML element to another
     *
     * @see ContentFilter.#convert
     * @type {Object.<string, string>}
     */
    filter: {},

    /**
     * Language for i18n
     *
     * @see Plugin._i18n
     * @type {string|undefined}
     */
    lang: 'en',

    /**
     * Names of the built-in plugins to load
     *
     * @see Editor.init
     * @see Editor.defaultConfig
     * @type {string[]}
     */
    pluginNames: [],


    /**
     * Custom plugins
     * new plugin or overrides default plugin
     * =============================================
     */
    customPlugins: {
        /**
         * Audio plugin
         */
        audio: {
            /**
             * URL to audio browser
             *
             * If browser URL is provided, an audio browser dialog is used to insert new audio elements instead of the 
             * default audio dialog that provides just a simple form to set the src attribute.
             *
             * @see Audio.init
             * @type {string|undefined}
             */
            browser: undefined,
        },

        /**
         * Block plugin
         */
        block: {
            /**
             * URL to block API including the placeholder {id}, p.e. '/api/{id}.html'
             *
             * The placeholder {id} will be replaced by the value of the block element's id attribute and then a GET request
             * will be sent to the resulting URL, p.e. if the block API URL is configured to '/api/{id}.html' and the block
             * element's id attribute is 1, an GET request is sent to '/api/1.html'. The block API must only return the HTML
             * content for the preview if the block with the requested ID exists.
             *
             * @see BlockListener.insertappblock
             * @type {string|undefined}
             */
            api: undefined,

            /**
             * URL to block browser
             *
             * If browser URL is provided, a block browser dialog is used to insert new block elements instead of the 
             * default block dialog that provides just a simple form to set the id attribute.
             *
             * @see Block.init
             * @type {string|undefined}
             */
            browser: undefined,

            /**
             * Comma-separated list of URLs to CSS files that should be included by the autonomous custom block element
             *
             * @see BlockListener.insertappblock
             * @type {string|undefined}
             */
            css: undefined,
        },

        /**
         * Iframe plugin
         */
        iframe: {
            /**
             * URL to iframe browser
             *
             * If browser URL is provided, an iframe browser dialog is used to insert new iframe elements instead of the
             * default iframe dialog that provides just a simple form to set the src, width and height attributes.
             *
             * @see Iframe.init
             * @type {string|undefined}
             */
            browser: undefined,
        },

        /**
         * Image plugin
         */
        image: {
            /**
             * URL to image browser
             *
             * If browser URL is provided, an image browser dialog is used to insert new image elements instead of the 
             * default image dialog that provides just a simple form to set the src, alt, width and height attributes.
             *
             * @see Image.init
             * @type {string|undefined}
             */
            browser: undefined,
        },

        /**
         * Video plugin
         */
        video: {
            /**
             * URL to video browser
             *
             * If browser URL is provided, a video browser dialog is used to insert new video elements instead of the 
             * default video dialog that provides just a simple form to set the src, width and height attributes.
             *
             * @see Video.init
             * @type {string|undefined}
             */
            browser: undefined,
        },
    }
};
```
