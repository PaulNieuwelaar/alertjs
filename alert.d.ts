/// <reference types="powerapps-component-framework" />
/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="jquery" />
/**
 * Class for Dialog Builder
 * https://github.com/PaulNieuwelaar/alertjs/wiki/Documentation-v3.0
 */
declare class Dialog {
    private static _version;
    private static _defaultColor;
    private static _crmColor;
    private static _context;
    private static _crmContext;
    private _element;
    private _getDialogId;
    private _getPopupName;
    private _resolvePromise?;
    /**
     * Within a Dynamics 365 PCF control, set this to context.factory.getPopupService() to use the supported popup service instead of adding custom HTML to the DOM.
     */
    static popupService: ComponentFramework.FactoryApi.Popup.PopupService;
    /**
     * Within a Dynamics 365 PCF control, set this to context.utils to use the supported lookupObjects instead of accessing it from the parent page.
     */
    static utility: ComponentFramework.Utility;
    /**
     * Within a Dynamics 365 PCF control, set this to context.webAPI to use the supported Web API instead of accessing it from the parent page.
     */
    static webAPI: ComponentFramework.WebApi;
    /**
     * Create a new instance of a dialog, passing in all the options required for the dialog. This can then be used and reused with the supported functions, e.g. show(), hide(), etc.
     *
     * @param options An object containing all the options for displaying this dialog. Not all options are available for all types of dialog. Options that are not available will be ignored, or may have unexpected results.
     */
    constructor(options?: DialogOptions);
    /**
     * DEPRECATED: Sets the global jQuery reference to be used by all dialogs. If not set, the window/parent jQuery reference will be used.
     */
    static jQuery: JQueryStatic;
    /**
     * DEPRECATED: Sets the global jQuery reference to be used by all dialogs. If not set, the window/parent jQuery reference will be used.
     */
    jQuery(jQuery: JQueryStatic): Dialog;
    /**
     * DEPRECATED: This function acts as a wrapper for jQuery, which can be used to access elements within a Dialog.
     *
     * @param selector The jQuery selector to use, e.g. ".dialog-js-dialog-wrapper div".
     * @param context The context in which to apply the selector. Use .get() to scope to a particular dialog, otherwise scopes to all dialogs by default.
     */
    static $(selector: string, context?: JQuery | HTMLElement | Document): JQuery;
    /**
     * DEPRECATED: This function acts as a wrapper for jQuery, which can be used to access elements within a Dialog.
     *
     * @param selector The jQuery selector to use, e.g. ".dialog-js-title".
     * @param context The context in which to apply the selector. Defaults to the scope of the current dialog.
     */
    $(selector: string, context?: JQuery | HTMLElement | Document): JQuery;
    private _title?;
    /**
     * The main (large) text to display inside the message. This should not exceed a single line on the dialog.
     */
    title(title?: string): Dialog;
    private _message?;
    /**
     * The sub-heading (smaller) text to display below the title. This should not exceed a single line on the dialog.
     */
    message(message?: string): Dialog;
    private _content?;
    /**
     * The content to display directly below the message. This value accepts an HTML string, or an HTML Element, so if you want to display more complex messages, you can pass in custom HTML. You can also display plugin traces or error messages here, or even create more complex HTML objects like iframes etc spanning multiple lines, displaying a scrollbar as needed. Note: use the htmlEncode function to display things like XML.
     */
    content(content?: string | Element): Dialog;
    private _buttons?;
    /**
     * The buttons to display inside the dialog. If this is set to null, a default "OK" button is displayed, which simply closes the message. If this is set to an empty array, no buttons will be displayed.
     */
    buttons(buttons?: Dialog.Button[]): Dialog;
    private _icon?;
    /**
     * The icon or custom image URL to display beside the message. ERROR | WARNING | INFO | SUCCESS | QUESTION | LOADING | SEARCH
     */
    icon(icon?: string): Dialog;
    private _width?;
    /**
     * The width of the dialog. If not specified, this will default to 500px.
     */
    width(width?: number | string): Dialog;
    private _height?;
    /**
     * The height of the dialog. If not specified, this will default to 250px. If the message content exceeds the height of the dialog, a scroll bar will be added allowing the user to read the whole message.
     */
    height(height?: number | string): Dialog;
    private _baseUrl?;
    /**
     * DEPRECATED: The CRM server base URL. Not required on forms or views.
     */
    baseUrl(baseUrl?: string): Dialog;
    /**
     * DEPRECATED: Use preventClose instead.
     */
    preventCancel(preventCancel?: boolean): Dialog;
    private _preventClose?;
    /**
     * Specify whether the 'X' to close the dialog should be hidden. This prevents the user from closing the dialog without using one of the specified buttons.
     */
    preventClose(preventClose?: boolean): Dialog;
    private _preventResize?;
    /**
     * Specify whether the 'Fullscreen' button on the dialog should be hidden. This prevents the user from expanding or resizing the dialog.
     */
    preventResize(preventResize?: boolean): Dialog;
    private _allowDismiss?;
    /**
     * Specify whether to allow the user to dismiss/cancel the dialog by clicking outside of the dialog. If this is set to true, clicking anywhere outside of the dialog will perform a 'hide' on the topmost dialog, without firing any button callbacks. This performs similar to clicking the 'X' in the top right corner.
     */
    allowDismiss(allowDismiss?: boolean): Dialog;
    private _padding?;
    /**
     * Specify custom padding around the popup. If not specified, or set to null, this will default to 20px for standard dialogs and prompts, and 10px for iframes and web resources.
     */
    padding(padding?: number | string): Dialog;
    private _fullscreen?;
    /**
     * Setting this to true will cause the dialog to expand to 100% of the available screen size. This overrides the width and height properties.
     */
    fullscreen(fullscreen?: boolean): Dialog;
    private _color?;
    /**
     * Set the primary color of the title and buttons. If not specified, this will default to the CRM theme's main color.
     */
    color(hex?: string): Dialog;
    private _id;
    /**
     * Set a custom ID to allow you to stack multiple dialogs without the previous being overwritten.
     */
    id(id: string | number): Dialog;
    private _fields?;
    /**
     * Set the fields to display in the dialog, used with the showPrompt function.
     */
    fields(fields?: (Dialog.Input | Dialog.MultiLine | Dialog.OptionSet | Dialog.Lookup | Dialog.Custom | Dialog.Group | null)[]): Dialog;
    /**
     * Add or update a field on the dialog. If the ID already exists, it overwrites the existing field, otherwise it is added to the bottom of the dialog.
     */
    addField(field: Dialog.Input | Dialog.MultiLine | Dialog.OptionSet | Dialog.Lookup | Dialog.Custom | Dialog.Group, insertAtIndex?: number): Dialog;
    /**
     * Removes a specific field from the dialog by its ID (string) or index (number).
     */
    removeField(id: string | number): Dialog;
    private _columns?;
    /**
     * Set the number of columns to display dialog fields in. Defaults to 1.
     */
    columns(columns?: number | string): Dialog;
    private _canvasAppName?;
    /**
     * Set the canvas app unique name from the current environment to display in an iframe.
     */
    canvasAppName(canvasAppName?: string): Dialog;
    private _webResourceName?;
    /**
     * Set the web resource name from the current environment to display inside an iframe.
     */
    webResourceName(webResourceName?: string): Dialog;
    private _iframeUrl?;
    /**
     * Set the iframe URL to display inside the dialog.
     */
    iframeUrl(iframeUrl?: string): Dialog;
    private _iframeContent?;
    /**
     * Set the iframe content to display custom HTML inside an iframe.
     */
    iframeContent(iframeContent?: string): Dialog;
    private _iframeQueryStrings?;
    /**
     * Set the query string parameters to append to the iframe URL. Each Object key is a new query string parameter, and the Object value is the query string value.
     */
    iframeQueryStrings(iframeQueryStrings?: {
        [key: string]: string;
    }): Dialog;
    private _internalId?;
    /**
     * Use this method to show a light-box message. This can be called from a form, view, or anywhere that supports JavaScript.
     */
    show(): Dialog;
    /**
     * Use this method to show a light-box message. This can be called from a form, view, or anywhere that supports JavaScript.
     */
    showAsync(): Promise<PromptResponsesAsync>;
    /**
     * DEPRECATED: Use this method to manually hide the dialog from code. This is useful if you have a background process running which once completed, will automatically close the dialog. This is the default behaviour when closing a dialog using the 'X' or by using a button.
     */
    hide(): Dialog;
    /**
     * DEPRECATED: Use this method to completely remove the dialog from the document. By default dialogs are only hidden when closed, and will remain in the DOM. Use this function to completely remove it once you're done accessing any information from the dialog.
     */
    remove(): Dialog;
    /**
    * Use this method to close the dialog and completely remove it from the document.
    */
    close(): Dialog;
    /**
     * Use this method to display a small loading spinner with the text "Loading...". This is just a simple wrapper for the Dialog.show method with a few standardised defaults, making it easier to reuse when needing to display a loading message.
     */
    showLoading(): Dialog;
    /**
     * Use this method to display an HTML web resource inside a light-box. The URL of the web resource is generated and then passed into the Dialog.showIFrame function, which creates an iframe to the web resource. You can also optionally add custom titles, buttons, and padding, just like the standard Dialog.show function.
     *
     * @param webResourceName The schema name of the HTML web resource to display inside the dialog. Additional query string parameters can be added to the webResourceName to pass values to the web resource (must be added to the Data query string).
     */
    showWebResource(webResourceName: string): Dialog;
    /**
     * Use this method to display a webpage or custom HTML inside a light-box, via an iFrame. You can also optionally add custom titles, buttons, and padding, just like the standard show function.
     *
     * @param iframeUrl The URL of the webpage to display inside the light-box. This webpage must allow being displayed inside an iframe. E.g. "http://bing.com" works but "http://google.com" does not.
     * @param iframeContent Custom HTML to display inside the iframe. Ideally, this should be an entire HTML page, including the body and head tags etc. This will override the iframeUrl if provided. NOTE: This is not supported in IE/Edge.
     */
    showIFrame(iframeUrl: string | null, iframeContent?: string): Dialog;
    /**
     * Use this method to show a prompt containing fields to capture input from the user. Return the responses using getPromptResponses, or using the first parameter inside the button callback, and then use those values to continue processing.
     *
     * @param fields The fields to display inside the prompt. Each type of field is constructed differently.
     */
    showPrompt(fields?: (Dialog.Input | Dialog.MultiLine | Dialog.OptionSet | Dialog.Lookup | Dialog.Custom | Dialog.Group | null)[]): Dialog;
    /**
    * Use this method to show a canvas app from the current environment in a dialog via iframe. Specify the canvas app unique name from a solution, and optionally pass additional query parameters.
    *
    * @param appUniqueName The unique name of the canvas app. This can be obtained from a solution, and is the 'Name' of the app component, e.g. looks something like 'mag_appname_9d035'. Canvas app unique names are persisted when deployed across environments.
    * @param additionalQueryParams Optional additional query string parameters to pass to the canvas app. Each Object key is a new query string parameter, and the Object value is the query string value.
    */
    showCanvasApp(appUniqueName: string, additionalQueryParams?: {
        [key: string]: string;
    }): this;
    /**
     * DEPRECATED: Use this method to display a CRM dialog process inside a light-box. The URL of the dialog process is generated and then passed into the showIFrame function, which creates an iframe to the dialog process. You can also optionally specify a callback function which will execute when the dialog is completed or cancelled, allowing you to refresh the form for example.
     *
     * @param dialogId The Guid of the dialog to display. You can find this by opening the process, and getting the 'id' query string parameter from the URL.
     * @param entityName The schema name of the entity the dialog is being run for.
     * @param recordId The Guid of the record to run the dialog against.
     * @param callback A function to call when the dialog is closed. This should include any code you wish to execute after the user is finished with the dialog, e.g. to refresh the form. Note that this function will fire whether the user completed the dialog, or closed it without completing it.
     */
    showDialogProcess(dialogId: string, entityName: string, recordId: string, callback?: () => void): Dialog;
    /**
     * Use this method to get the context of an iFrame being displayed in the light-box. For example, if you're capturing input via a web resource, you can use this function to access the inputs on the web resource from inside a custom function. This allows you to use custom buttons to access the iFrame data. This value is also returned as the first parameter of each button callback when using showIFrame or showWebResource.
     */
    getIFrameWindow(): Window | null;
    /**
     * This method gives you context of the CRM form (or client API wrapper if turbo forms are enabled). This allows you to access CRM functions, and your own custom JavaScript libraries from inside iFrame dialogs. From inside a web resource, for example, you can call new parent.Dialog().getCrmWindow().doSomething();, where "doSomething()" represents a custom function loaded onto the parent form.
     */
    getCrmWindow(): Window;
    /**
     * This method gets the responses from the last displayed prompt. Responses are returned in the same order they are displayed. This value is also returned as the first parameter of each button callback when using showPrompt.
     */
    getPromptResponses(): Dialog.PromptResponses;
    /**
     * This method gets a specific element within the dialog using a query selector, e.g. "#field1 input". If no query selector is specified, the outer dialog element is returned. This must be called after showing the dialog.
     */
    getElement(querySelector?: string): HTMLElement | null;
    /**
     * This method gets specific DOM elements within the dialog using the specified query selector, e.g. ".dialog-js-prompt-field". This must be called after showing the dialog.
     */
    getElements(querySelector: string): HTMLElement[];
    /**
     * DEPRECATED: This method gets the jquery object for this dialog. Used for accessing specific inner elements when multiple dialogs are displayed. This must be called after showing the dialog.
     */
    get(): JQuery;
    /**
     * Use this method to encode a custom message which contains HTML characters, to allow it to be displayed inside the dialog message. For example, if displaying formatted XML with indented spacing and XML tags, calling this method will format the text into an HTML friendly message that displays nicely inside the dialog. The returned value should then be passed to the 'message' of the Dialog.show method. NOTE: If you want to actually use HTML tags, like <b>bold</b>, you should not use this method.
     *
     * @param text The text to encode, e.g. a trace log.
     */
    htmlEncode(text: string): string;
    private _createDialog;
    private static _createElement;
    private _attachEventHandlers;
    private _buttonClicked;
    private _getChildFieldResponses;
    private _showLookupDialog;
    private _fileUploadedOnChange;
    private _createField;
    private _getLookupName;
    private _utcToLocalTime;
    private _addExtraAttributes;
    private _setupDragElement;
    private _showHeadingOrContent;
    private _createIframe;
    private _brightenColor;
    private _brightenRgbComponent;
    private _setDialogColors;
    private _getBaseUrl;
    static _setGlobals(): void;
    private static _getColorFromCrm;
    private static _getDialogContext;
    private static LM;
    /**
     * DEPRECATED: Use new Dialog(options) instead.
     */
    static show(title?: string | null, message?: string | null, buttons?: Dialog.Button[] | null, icon?: string | null, width?: number | string | null, height?: number | string | null, baseUrl?: string | null, preventClose?: boolean | null, padding?: number | string | null, id?: string | number | null): void;
    /**
     * DEPRECATED: Use new Dialog(options) instead.
     */
    static hide(id?: string | number | null): void;
    /**
     * DEPRECATED: Use new Dialog(options) instead.
     */
    static remove(id?: string | number | null): void;
    /**
     * DEPRECATED: Use new Dialog(options) instead.
     */
    static close(id?: string | number | null): void;
    /**
     * DEPRECATED: Use new Dialog(options) instead.
     */
    static showLoading(baseUrl?: string | null, id?: string | number | null): void;
    /**
     * DEPRECATED: Use new Dialog(options) instead.
     */
    static showWebResource(webResourceName: string, width?: number | string | null, height?: number | string | null, title?: string | null, buttons?: Dialog.Button[] | null, baseUrl?: string | null, preventClose?: boolean | null, padding?: number | string | null, id?: string | number | null): void;
    /**
     * DEPRECATED: Use new Dialog(options) instead.
     */
    static showDialogProcess(dialogId: string, entityName: string, recordId: string, callback?: (() => void) | null, width?: number | string | null, height?: number | string | null, baseUrl?: string | null, id?: string | number | null): void;
    /**
     * DEPRECATED: Use new Dialog(options) instead.
     */
    static showIFrame(iframeUrl: string, width?: number | string | null, height?: number | string | null, title?: string | null, buttons?: Dialog.Button[] | null, baseUrl?: string | null, preventClose?: boolean | null, padding?: number | string | null, id?: string | number | null): void;
    /**
     * DEPRECATED: Use new Dialog(options) instead.
     */
    static showPrompt(fields?: (Dialog.Input | Dialog.MultiLine | Dialog.OptionSet | Dialog.Lookup | Dialog.Custom | Dialog.Group)[] | null, title?: string | null, message?: string | null, buttons?: Dialog.Button[] | null, icon?: string | null, width?: number | string | null, height?: number | string | null, baseUrl?: string | null, preventClose?: boolean | null, padding?: number | string | null, id?: string | number | null): void;
    /**
     * DEPRECATED: Use new Dialog(options) instead.
     */
    static getIFrameWindow(id?: string | number | null): Window | null;
    /**
     * DEPRECATED: Use new Dialog(options) instead.
     */
    static getCrmWindow(): Window;
    /**
     * DEPRECATED: Use new Dialog(options) instead.
     */
    static getPromptResponses(id?: string | number | null): Dialog.PromptResponses;
    /**
     * DEPRECATED: Use new Dialog(options) instead.
     */
    static get(id?: string | number | null): JQuery;
    /**
     * DEPRECATED: Use new Dialog(options) instead.
     */
    static htmlEncode(text: string): string;
}
declare namespace Dialog {
    /**
     * Class for Button constructor
     */
    class Button {
        id?: string;
        label?: string;
        callback?: (data: Dialog.PromptResponses | Window) => void;
        setFocus?: boolean;
        preventClose?: boolean;
        /**
         * A button to display at the bottom of a dialog.
         *
         * @param label The text to display on the button.
         * @param callback A custom function to call when the button is clicked. Passes through the IFrame window or prompt responses as a parameter. A callback is not required, as the button can still close the dialog by default (unless you specify otherwise).
         * @param setFocus Specify whether this button should have focus set to it by default, i.e. to allow pressing 'enter' to fire the button command. If there is only one button, focus is automatically set to the button, unless you explicitly set this to false. Buttons with setFocus set to true will display as a 'blue' primary button.
         * @param preventClose Specify whether this button should not close the dialog after executing the callback function. By default, if this value is not specified, the dialog will be automatically closed after clicking the button. Set this to true if you want to keep the dialog open, for example if your button does something like the 'download log' for CRM errors, where you want to keep the error open, or if you want to run some validation before closing the dialog.
         */
        constructor(label?: string, callback?: ((data: Dialog.PromptResponses | Window) => void) | null, setFocus?: boolean | null, preventClose?: boolean | null);
    }
    /**
     * Class for _Field constructor
     */
    class _Field {
        fieldType: "Input" | "MultiLine" | "OptionSet" | "Lookup" | "Custom" | "Group";
        id?: string;
        label?: string;
        inline?: boolean;
        value?: any;
        extraAttributes?: {
            [key: string]: string;
        };
        constructor(fieldType: "Input" | "MultiLine" | "OptionSet" | "Lookup" | "Custom" | "Group", label?: string, inline?: boolean, value?: any, id?: string, extraAttributes?: {
            [key: string]: string;
        });
    }
    /**
     * Class for Input constructor
     */
    class Input extends _Field {
        type: string;
        /**
         * Creates a standard input. This can be plain text, or other HTML 5 input types.
         *
         * @param options The options for the input, including id, label, value, and type.
         * @param extraAttributes Extra HTML attributes that will be added to the input. This can include things like: { name: "radiolist" } to add a name grouping to radio buttons.
         */
        constructor(options?: InputOptions, extraAttributes?: {
            [key: string]: string;
        });
    }
    /**
     * Class for MultiLine constructor
     */
    class MultiLine extends _Field {
        /**
         * Creates a multiline textarea with default height of 60px.
         *
         * @param options The options for the multiline, including id, label, and value.
         * @param extraAttributes Extra HTML attributes that will be added to the text area. This can include things like: { maxlength: 200 } to set a max length on the text area.
         */
        constructor(options?: MultiLineOptions, extraAttributes?: {
            [key: string]: string;
        });
    }
    /**
     * Class for OptionSet constructor
     */
    class OptionSet extends _Field {
        options?: OptionSetValue[];
        /**
         * Creates an optionset/select field.
         *
         * @param options The field options for the optionset, including id, label, value, and options.
         * @param extraAttributes Extra HTML attributes that will be added to the option set. This can include things like: { multiple: "multiple", style: "height: 100px" } to create a multi-select option set with a fixed height of 100px.
         */
        constructor(options?: OptionSetOptions, extraAttributes?: {
            [key: string]: string;
        });
    }
    /**
     * Class for Lookup constructor
     */
    class Lookup extends _Field {
        entityTypes?: string[] | string;
        customFilters?: string[];
        disableMru?: boolean;
        allowMultiSelect?: boolean;
        callback?: (results?: LookupObject[]) => void;
        filters?: LookupFilter[];
        /**
         * Creates a lookup field in CRM version 9.0 and above.
         *
         * @param options The options for the lookup, including id, label, value, entityTypes, disableMru, and filters.
         * @param extraAttributes Extra HTML attributes that will be added to the lookup text box.
         */
        constructor(options?: LookupOptions, extraAttributes?: {
            [key: string]: string;
        });
    }
    /**
     * Class for Custom constructor
     */
    class Custom extends _Field {
        /**
         * Creates a custom html field.
         *
         * @param options The options for the custom html field, including id, label, and value.
         */
        constructor(options?: CustomOptions);
    }
    /**
     * Class for Group constructor
     */
    class Group extends _Field {
        columns?: number | string;
        fields?: (Dialog.Group | Dialog.Input | Dialog.MultiLine | Dialog.OptionSet | Dialog.Lookup | Dialog.Custom)[];
        /**
         * Creates an outlined section/container for multiple fields. Useful for displaying multiple radio buttons together. Can also be used without fields to just show an extra static label.
         *
         * @param options The options for the group, including id, label, fields, and columns.
         * @param extraAttributes Extra HTML attributes that will be added to the div containing the fields. This can include things like: { style: "max-height: 100px" } to add a scrollbar to the group if the fields exceed the max height.
         */
        constructor(options?: GroupOptions, extraAttributes?: {
            [key: string]: string;
        });
    }
    /**
    * Class for PromptResponses
    */
    class PromptResponses extends Array<PromptResponse> {
        constructor();
        /**
         * Get the value of a prompt response by its index (number) or id (string).
         */
        getValue(id: string | number): any;
        /**
         * Get the ids of any prompt responses with a value of true. Used to get just the selected field(s) from a group of radio or checkbox fields.
         */
        getSelected(): string[];
        /**
         * Get the values of the responses in a cleaner object structure which can be used with HTTP requests etc. Object key = the field ID or array index with an underscore (e.g. "_0") if ID is null. Object value = the actual field value. Groups follow the same structure.
         */
        getData(): {
            [key: string]: any;
        };
    }
}
/**
 * DEPRECATED: Backwards compatability for Alert. Includes all functionality from Dialog, including the legacy methods e.g. Alert.show();
 */
declare var Alert: typeof Dialog;
/**
 * Interface for DialogOptions
 */
interface DialogOptions {
    /**
     * The main (large) text to display inside the message. This should not exceed a single line on the dialog.
     */
    title?: string;
    /**
     * The sub-heading (smaller) text to display below the title. This should not exceed a single line on the dialog.
     */
    message?: string;
    /**
     * The content to display directly below the message. This value accepts an HTML string, or HTML Element, so if you want to display more complex messages, you can pass in custom HTML. You can also display plugin traces or error messages here, or even create more complex HTML objects like iframes etc spanning multiple lines, displaying a scrollbar as needed. Note: use the htmlEncode function to display things like XML.
     */
    content?: string | Element;
    /**
     * The buttons to display inside the dialog. If this is set to null, a default "OK" button is displayed, which simply closes the message. If this is set to an empty array, no buttons will be displayed.
     */
    buttons?: Dialog.Button[];
    /**
     * The icon or custom image URL to display beside the message. ERROR | WARNING | INFO | SUCCESS | QUESTION | LOADING | SEARCH
     */
    icon?: string;
    /**
     * The width of the dialog in pixels. If not specified, this will default to 500px.
     */
    width?: number | string;
    /**
     * The height of the dialog in pixels. If not specified, this will default to 250px. If the message content exceeds the height of the dialog, a scroll bar will be added allowing the user to read the whole message.
     */
    height?: number | string;
    /**
     * DEPRECATED: The CRM server base URL. Not required on forms or views.
     */
    baseUrl?: string;
    /**
     * DEPRECATED: Use preventClose instead.
     */
    preventCancel?: boolean;
    /**
     * Specify whether the 'X' to close the dialog should be hidden. This prevents the user from closing the dialog without using one of the specified buttons.
     */
    preventClose?: boolean;
    /**
     * Specify whether the 'Fullscreen' button on the dialog should be hidden. This prevents the user from expanding or resizing the dialog.
     */
    preventResize?: boolean;
    /**
     * Specify whether to allow the user to dismiss/cancel the dialog by clicking outside of the dialog. If this is set to true, clicking anywhere outside of the dialog will perform a 'hide' on the topmost dialog, without firing any button callbacks. This performs similar to clicking the 'X' in the top right corner.
     */
    allowDismiss?: boolean;
    /**
     * Specify custom padding around the popup (in pixels). If not specified, or set to null, this will default to 20px for standard dialogs and prompts, and 10px for iframes and web resources.
     */
    padding?: number | string;
    /**
     * Setting this to true will cause the dialog to expand to 100% of the available screen size. This overrides the width and height properties.
     */
    fullscreen?: boolean;
    /**
     * Set the primary color of the title, buttons, and prompt field shadows. If not specified, this will default to the CRM theme's main color.
     */
    color?: string;
    /**
     * Set the fields to display in the dialog, used with the showPrompt function.
     */
    fields?: (Dialog.Input | Dialog.MultiLine | Dialog.OptionSet | Dialog.Lookup | Dialog.Custom | Dialog.Group)[];
    /**
     * Set the number of columns to display fields in, and optionally the minimum width per column, e.g. "100px 2". Defaults to 1 column if unspecified.
     */
    columns?: number | string;
    /**
     * The unique name of a canvas app from the current environment to display in an iframe. This can be obtained from a solution, and is the 'Name' of the app component. Canvas app unique names are persisted when deployed across environments.
     */
    canvasAppName?: string;
    /**
     * The name of a web resource to display in an iframe.
     */
    webResourceName?: string;
    /**
     * The URL of the webpage to display inside the dialog. This webpage must allow being displayed inside an iframe. E.g. "http://bing.com" works but "http://google.com" does not.
     */
    iframeUrl?: string;
    /**
     * Set the iframe content to display custom HTML inside an iframe.
     */
    iframeContent?: string;
    /**
     * Set the query string parameters to append to the iframe URL. Each Object key is a new query string parameter, and the Object value is the query string value.
     */
    iframeQueryStrings?: {
        [key: string]: string;
    };
    /**
     * Set a custom ID to allow you to stack multiple dialogs without the previous being overwritten.
     */
    id?: string | number;
    /**
     * DEPRECATED: Sets the global jQuery reference to be used by all dialogs. If not set, the window/parent jQuery reference will be used.
     */
    jQuery?: JQueryStatic;
    _internalId?: string;
}
/**
 * Interface for FieldOptions
 */
interface FieldOptions {
    /**
     * A unique identifier for the field. This will be used as the 'id' property when getting responses.
     */
    id?: string;
    /**
     * The label text above or beside the field (depending on the type). Checkbox and Radio inputs have the label to the right. If no label is provided, the field will be displayed without a label.
     */
    label?: string;
    /**
     * Sets the label to be aligned above the field, or beside the field inline. Defaults to true.
     */
    inline?: boolean;
}
/**
 * Interface for InputOptions
 */
interface InputOptions extends FieldOptions {
    /**
     * The default value for the input. The type of object depends on the 'type' used for this input. E.g. 'number' takes a Number, 'date' and 'datetime-local' take a Date object, 'text' takes a String, and 'radio' or 'checkbox' take a bool.
     */
    value?: string | number | Date | boolean | null;
    /**
     * The type of HTML input to use. This will default to 'text' if not specified.
     * Any HTML input type can be used, but the following are supported:
     * - text.
     * - number. Specify 'min' and 'max' etc using extraAttributes.
     * - date. Does not display a date picker in Internet Explorer.
     * - datetime-local. Does not display a date picker in Internet Explorer, or Firefox/Safari web.
     * - radio. Specify 'name' using extraAttributes.
     * - checkbox.
     * - file. Specify 'multiple' using extraAttributes.
     * - range.
     */
    type?: string;
}
/**
 * Interface for MultiLineOptions
 */
interface MultiLineOptions extends FieldOptions {
    /**
     * The default value for the text area.
     */
    value?: string;
}
/**
 * Interface for OptionSetOptions
 */
interface OptionSetOptions extends FieldOptions {
    /**
     * The default value for the option set. This should be the 'value' of the option to select by default. If the 'multiple' additionalAttribute is set, this can be an Array of values to select multiple values by default.
     */
    value?: any | any[];
    /**
     * The options to display in the option set. This value uses the exact same structure as the .getOptions() function on a CRM optionset field.
     */
    options?: OptionSetValue[];
}
/**
 * Interface for LookupOptions
 */
interface LookupOptions extends FieldOptions {
    /**
     * The default value for the lookup. This should follow the exact same structure as CRM when using .getValue() from a lookup field. Although this is an Array, only one lookup object is supported.
     */
    value?: LookupObject[];
    /**
     * The entity types to look up. E.g. ["contact"] for a contact lookup, or ["account", "contact"] for a customer lookup.
     */
    entityTypes?: string[];
    /**
     * Decides whether to display the most recently used (MRU) items. Available only for Unified Interface.
     */
    disableMru?: boolean;
    /**
    * Sets the lookup window to allow selecting multiple records.
    */
    allowMultiSelect?: boolean;
    /**
    * Specifies a callback function to run immediately after a lookup value has been selected.
    */
    callback?: (results?: LookupObject[]) => void;
    /**
     * Used to filter the lookup results. Available only for Unified Interface.
     */
    filters?: LookupFilter[];
    /**
     * DEPRECATED: Use filters instead. Custom filters to apply to the lookup results. Each custom filter will be applied to each of the specified entityTypes. These should not be URL encoded.
     * @see {@link https://docs.microsoft.com/en-us/dynamics365/customer-engagement/developer/clientapi/reference/controls/addcustomfilter#parameters}
     */
    customFilters?: string[];
}
/**
 * Interface for Custom
 */
interface CustomOptions extends FieldOptions {
    /**
     * The custom html to be displayed.
     */
    value?: string | HTMLElement;
}
/**
 * Interface for GroupOptions
 */
interface GroupOptions extends FieldOptions {
    /**
     * The fields to display inside the group.
     */
    fields?: (Dialog.Group | Dialog.Input | Dialog.MultiLine | Dialog.OptionSet | Dialog.Lookup | Dialog.Custom)[];
    /**
     * The number of columns to display fields in, and optionally the minimum width per column, e.g. "100px 2". Defaults to 1 column if unspecified.
     */
    columns?: number | string;
}
/**
 * Interface for OptionSetValue
 */
interface OptionSetValue {
    /**
     * The text to display in the option set for this option.
     */
    text: string;
    /**
     * The value returned if this option is selected. Options with a value of -1 (as a number) or "null" (as a string) will be ignored.
     */
    value: any;
    /**
     * The text to display in the tooltip when hovering over the option. If not specified, this will default to the option 'text'.
     */
    title?: string;
}
/**
 * Interface for PromptResponse
 */
interface PromptResponse {
    /**
     * The 'id' exactly matches the 'id' given to the field when creating the prompt. If no 'id' was specified on the field, this will be an empty string.
     */
    id?: string;
    /**
     * The 'value' represents the field value. This is different depending on the type of field used. Empty values will become 'null'.
     */
    value: any;
}
/**
 * Interface for PromptResponsesAsync
 */
interface PromptResponsesAsync {
    /**
     * The button which was clicked, containing the id and label etc. This will be an empty object if 'X' is clicked.
     */
    button: Dialog.Button;
    /**
     * The fields and values from the dialog. Object key = the field ID or array index with an underscore (e.g. "_0") if ID is null. Object value = the actual field value. Groups follow the same structure.
     */
    data?: {
        [key: string]: any;
    };
    /**
     * The window from the iframe or web resource. Can access iframe document to get custom inputs etc.
     */
    window?: Window;
}
/**
 * Interface for LookupObject
 */
interface LookupObject {
    /**
     * The Guid of the CRM record.
     */
    id: string;
    /**
     * The Name of the CRM record.
     */
    name: string;
    /**
     * The Entity Schema Name of the CRM record.
     */
    entityType: string;
}
/**
 * Interface for LookupFilter
 */
interface LookupFilter {
    /**
     * A FetchXML custom filter to apply on top of the lookup view filters. This should not be URL encoded.
     * @see {@link https://docs.microsoft.com/en-us/dynamics365/customer-engagement/developer/clientapi/reference/controls/addcustomfilter#parameters}
     */
    filterXml: string;
    /**
     * The entity type to apply this filter to.
     */
    entityLogicalName: string;
}
/**
 * Interface for FileData, extends File, adding the base64 value.
 */
interface FileData {
    /**
     * Base64 string contents of the uploaded file.
     */
    value: string;
    lastModified: number;
    name: string;
    size: number;
    type: string;
}
/**
 * Interface for CRMLookupOptions (supported properties missing from ComponentFramework)
 */
interface CRMLookupOptions {
    filters?: LookupFilter[];
    searchText?: string;
    showNew?: boolean;
    disableMru?: boolean;
    customFilters?: string[];
    customFilterTypes?: string[];
    defaultEntityType: string;
    entityTypes: string[];
    allowMultiSelect: boolean;
    defaultViewId?: string;
    viewIds?: string[];
}
/**
 * Interface for PopupOptions (supported properties missing from ComponentFramework)
 */
interface PopupOptions extends ComponentFramework.FactoryApi.Popup.Popup {
    popupStyle: {};
}
/**
 * Interface for storing extra attributes on inputs (for lookups and file pickers)
 */
interface DialogInputElement extends HTMLInputElement {
    callback?: (results?: LookupObject[] | undefined) => void;
    allowMultiSelect?: boolean;
    disableMru?: boolean;
    filters?: LookupFilter[];
    customFilters?: string[];
    entityTypes?: string[];
    lookupValue?: LookupObject[] | null | string;
    fileData?: string[] | null;
}
