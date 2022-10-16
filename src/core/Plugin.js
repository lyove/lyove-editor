import Command from './Command.js';
import Editor from './Editor.js';
import Tag from './Tag.js';
import Icons from "../icons/Icons.js";
import { ErrorMessage, TagName } from '../utils/Enum.js';
import { isString } from '../utils/util.js';

/**
 * Plugin
 */
export default class Plugin {
    /**
     * Editor
     *
     * @type {Editor}
     */
    #editor;

    /**
     * Allows read access to editor
     *
     * @return {Editor}
     */
    get editor() {
        return this.#editor;
    }

    /**
     * Name
     *
     * @type {string}
     */
    static get name() {
        throw new Error(ErrorMessage.MISSING_NAME);
    }

    /**
     * Dependencies
     *
     * @type {Plugin[]}
     */
    static get dependencies() {
        return [];
    }

    /**
     * Returns plugin default configuration
     *
     * @type {Object.<string, any>}
     */
    static get config() {
        return {};
    }

    /**
     * Initializes a new plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        if (!(editor instanceof Editor)) {
            throw new Error(ErrorMessage.INVALID_ARGUMENT);
        }

        this.#editor = editor;
    }

    /**
     * Initializes plugin
     *
     * @abstract
     * @return {void}
     */
    init() {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    /**
     * Translates given string
     *
     * @protected
     * @param {string} key
     * @return {string}
     */
    _(key) {
        return this.editor.translator.translate(this.constructor.name, key);
    }

    /**
     * Translates given string with base context
     *
     * @protected
     * @param {string} key
     * @return {string}
     */
    _base(key) {
        return this.editor.translator.translate('base', key);
    }

    /**
     * Registers i18n data for this plugin
     *
     * @protected
     * @param {Object.<string, Object.<string, string>>} i18n
     * @return {void}
     */
    _i18n(i18n) {
        if (i18n[this.editor.config.lang]) {
            this.editor.translator.set(this.constructor.name, i18n[this.editor.config.lang]);
        }
    }

    /**
     * Creates and registers a tag with given options
     *
     * @protected
     * @param {Object} opts
     * @return {void}
     */
    _tag(opts) {
        this.editor.tags.set(new Tag(opts));
    }

    /**
     * Registers a command with given parameters
     *
     * @protected
     * @param {string} tagName
     * @return {void}
     */
    _command(tagName) {
        this.editor.commands.set(new Command(this.editor, this.constructor.name, tagName));
    }

    /**
     * Adds a menubar button
     *
     * @protected
     * @param {string} label
     * @param {string} command
     * @return {void}
     */
    _menubar({ label, command, arrowDown, uuid }) {
        this.editor.menubar.appendChild(this.#button({
            label,
            command,
            arrowDown,
            uuid
        }));
    }

    /**
     * Adds a toolbar button
     *
     * @protected
     * @param {string} label
     * @param {string} command
     * @return {void}
     */
    _toolbar({ label, command, arrowDown, uuid }) {
        this.editor.toolbar.appendChild(this.#button({
            label,
            command,
            arrowDown,
            uuid
        }));
    }

    /**
     * Adds a formatbar button
     *
     * @protected
     * @param {string} label
     * @param {string} key
     * @param {string} command
     * @return {void}
     */
    _formatbar({ label, command, key, arrowDown, uuid }) {
        const alt = this._base('Alt');
        const shift = this._base('Shift');
        const title = label + (key ? ` [${alt} + ${shift} + ${key}]` : '');
        this.editor.formatbar.appendChild(this.#button({
            label,
            command,
            title,
            key,
            arrowDown,
            uuid
        }));
    }

    /**
     * Adds a focusbar button
     *
     * @protected
     * @param {string} label
     * @param {string} command
     * @return {void}
     */
    _focusbar({ label, command, key, type, uuid }) {
        const { firstChild, lastChild } = this.editor.focusbar;
        if (type === "toggle") {
            firstChild.appendChild(this.#button({
                label,
                command,
                title: label,
                key
            }));
            return;
        }
        const ctrl = this._base('Ctrl');
        const title = label + (key ? ` [${ctrl} + ${key}]` : '');
        lastChild.appendChild(this.#button({
            label,
            title,
            command,
            key,
            uuid
        }));
    }

    /**
     * Creates a button
     *
     * @param {string} label
     * @param {string} title
     * @param {string} key
     * @param {string} command
     * @return {HTMLButtonElement}
     */
    #button({ label, command, title, key, arrowDown, uuid }) {
        if (!isString(label) || !isString(command)) {
            throw new Error(ErrorMessage.INVALID_ARGUMENT);
        }
        const icon = `<span class='btn-icon'>${Icons[command] || Icons.default}</span>`;
        const text = `<span class='btn-label'>${label}</span>`;
        const arrowIcon = arrowDown ? `<i class='separator'></i><span class='btn-arrow'>${arrowDown}</span>` : '';
        const attributes = {
            type: "button",
            "data-command": command,
            "data-title": title || label,
            "data-key": key,
            "data-tip": "tooltip",
            "data-tip-placement": "bottom",
            ...(uuid ? { "data-uuid": uuid } : {})
        };
        return this.editor.dom.createElement(TagName.BUTTON, {
            attributes,
            html: `${icon}${arrowIcon}${text}`,
        });
    }
}
