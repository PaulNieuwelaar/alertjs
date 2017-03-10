// Alert.js v2.2 *Beta* - Copyright Paul Nieuwelaar Magnetism 2017
// Download the latest version from https://alertjs.codeplex.com

/*    
Alert.show("Would you like to create a sale?", "This will create and open the new sale record.",
    [
        new Alert.Button("Create Sale", function () {
            Alert.show("Sale created successfully!", null, null, "SUCCESS", 500, 200);
        }, true, true),
        new Alert.Button("Not now")
    ], "QUESTION", 500, 200);
*/

// This acts as a constructor and/or a namespace, e.g.: Alert.show("Hello World!"); works the same as: new Alert().setTitle("Hello World!").show();
var Alert = function () {
    return this;
}

Alert._prefix = "mag_"; // Change this if you have your own solution prefix (as long as the file structure's the same)
Alert._dialogHeight = 250;
Alert._dialogWidth = 500;

Alert._initialised = false;
Alert._context = null;
Alert._crmContext = null;

// Stores the jQuery reference for the CRM main page (if turbo etc)
Alert._jQuery = window.jQuery ? window.$ : parent.$;

// Custom jQuery wrapper to use jquery from the parent CRM page to access elements from the top page where Alertjs is
Alert.$ = function (selector, context) {
    return Alert._jQuery(selector, context || Alert._context);
}

// purpose: display an alert style dialog for the user using a styled CRM lightbox
// Allows for custom buttons and callbacks
// title = Main big message
// message = (optional) Sub-heading shown below the title
// buttons = (otional, defaults to 'Ok') Array of buttons and callback functions for each button. Callbacks optional. E.g. [{label: "OK", callback: function(){}},{label: "Cancel"}]
// icon = (optional, defaults to none) Displays a custom icon on the alert: INFO, WARNING, ERROR, SUCCESS, QUESTION, LOADING
// width = (optional, defaults to _dialogWidth) Custom width of the dialog
// height = (optional, defaults to _dialogHeight) Custom height of the dialog
// baseUrl = (optional, defaults to getClientUrl) Base url of CRM (only required if no access to Xrm.Page)
// preventCancel = (optional, defaults to false) Hides the 'X' in the top right corner, meaning you can only dismiss the alert using the buttons
// padding = (optional, defaults to 20) Sets the amount of padding around the light-box. Set to 0 for no padding (on iframes etc)
Alert.show = function (title, message, buttons, icon, width, height, baseUrl, preventCancel, padding) {
    title = title || "";
    message = message || "";
    width = width || Alert._dialogWidth;
    height = height || Alert._dialogHeight;
    buttons = buttons || [{ label: "OK" }];
    baseUrl = baseUrl || Xrm.Page.context.getClientUrl();
    if (padding === undefined || padding === null) { padding = 20; }

    if (!Alert._initialised) {
        // The parent/top document which we append the wrapper to
        Alert._context = window.top.document;

        // The CRM window, for calling back from an Alert iframe. Use parent.Alert.getCrmWindow() to get back to the CRM window from inside an iframe
        Alert._crmContext = window;
        window.top.Alert = Alert;

        // The wrapper sits outside the form, so it may exist even if Alert.js is not initialised
        var alertJsWrapper = Alert.$("#alertJs-wrapper");
        if (alertJsWrapper == null || alertJsWrapper.length == 0) {
            var alertJsHtml =
                "<div id='alertJs-wrapper' class='alert-js-wrapper'>" +
                  "<link rel='stylesheet' href='" + baseUrl + "/WebResources/" + Alert._prefix + "/css/alert.css' />" +
                  "<div class='alert-js-background'></div>" +
                  "<div id='alertJs-dialog' class='alert-js-dialog'>" +
                    "<div class='alert-js-RefreshDialog-Warning' id='alertJs-divWarning'>" +
                      "<table class='alert-js-table-wrapper' cellspacing='0' cellpadding='0'>" +
                        "<tr id='alertJs-errorRow'>" +
                          "<td id='alertJs-imageWrapper' class='alert-js-image-td alert-js-td'>" +
                            "<div id='alertJs-image' class='alert-js-image'></div>" +
                          "</td>" +
                          "<td class='alert-js-td'>" +
                            "<div class='alert-js-Error-Header ms-crm-Field-Data-Print' id='alertJs-title'></div>" +
                            "<div class='alert-js-Error-Message ms-crm-Field-Data-Print' id='alertJs-message'></div>" +
                          "</td>" +
                        "</tr>" +
                      "</table>" +
                    "</div>" +
                    "<div class='alert-js-RefreshDialog-Footer' id='alertJs-tdDialogFooter'></div>" +
                    "<div id='alertJs-closeWrapper' class='alert-js-close-wrapper'>" +
                      "<div id='alertJs-close' class='alert-js-close' title='Cancel'></div>" +
                    "</div>" +
                  "</div>" +
                "</div>";

            Alert.$("body").append(alertJsHtml);
        }

        // Attach close event (messes up with jquery)
        var closeButton = Alert.$("#alertJs-close");
        if (closeButton && closeButton.length > 0) {
            closeButton[0].onclick = function () {
                Alert.hide();
            };
        }

        Alert._initialised = true;
    }

    // Update the title and message
    Alert.$("#alertJs-title").html(title);
    Alert.$("#alertJs-message").html(message);

    // Hide title if not specified
    if (title == "") { Alert.$("#alertJs-title").hide(); }
    else { Alert.$("#alertJs-title").show(); }

    // Hide message if not specified
    if (message == "") { Alert.$("#alertJs-message").hide(); }
    else { Alert.$("#alertJs-message").show(); }

    // Add the icon
    if (icon && ["INFO", "WARNING", "ERROR", "SUCCESS", "QUESTION", "LOADING"].indexOf(icon) !== -1) {
        var imgType = icon == "ERROR" ? "crit" : icon == "WARNING" ? "warn" : icon == "INFO" ? "info" : icon == "SUCCESS" ? "tick" : icon == "QUESTION" ? "ques" : "load";

        Alert.$("#alertJs-imageWrapper").show();

        // Remove any existing image classes before adding the new one
        Alert.$("#alertJs-image")
            .removeClass("alert-js-image-crit alert-js-image-warn alert-js-image-info alert-js-image-tick alert-js-image-ques alert-js-image-load")
            .addClass("alert-js-image-" + imgType);;
    }
    else {
        // Hide icon if not specified
        Alert.$("#alertJs-imageWrapper").hide();
    }

    // Delete existing buttons
    Alert.$("#alertJs-tdDialogFooter").empty();

    // Create new buttons
    for (var i = 0; i < buttons.length; i++) {
        var $button = Alert._jQuery("<button>", { tabindex: "1", type: "button" });
        $button.addClass("alert-js-RefreshDialog-Button");

        // Set focus to the button if explicitly specified, or if only one button
        if ((buttons.length == 1 && buttons[i].setFocus !== false) || buttons[i].setFocus === true) {
            $button.addClass("alert-js-RefreshDialog-Button-focus");
        }

        $button.html(buttons[i].label);

        // Create the callback for the button
        (function (callback, preventClose) {
            $button.click(function () {
                Alert._buttonClicked(callback, preventClose);
            });
        })(buttons[i].callback, buttons[i].preventClose);

        Alert.$("#alertJs-tdDialogFooter").append($button);
    }

    if (buttons.length > 0) {
        // Show the buttons bar
        Alert.$("#alertJs-divWarning").removeClass("alert-js-maxHeight");
        Alert.$("#alertJs-tdDialogFooter").show();
    }
    else {
        // Hide the buttons bar
        Alert.$("#alertJs-divWarning").addClass("alert-js-maxHeight");
        Alert.$("#alertJs-tdDialogFooter").hide();
    }

    // Show or hide the manual cancel button
    if (preventCancel) { Alert.$("#alertJs-closeWrapper").hide(); }
    else { Alert.$("#alertJs-closeWrapper").show(); }

    // Makes the formatting nicer if the popup is huge (for displaying trace logs etc)
    if (height > 250) { Alert.$(".alert-js-td").addClass("alert-js-td-top"); }
    else { Alert.$(".alert-js-td").removeClass("alert-js-td-top"); }

    // Set height/width of the alert
    Alert.$("#alertJs-dialog").css("height", height).css("width", width).css("margin-top", height * -0.5).css("margin-left", width * -0.5);

    // Set the height of the message body, to allow it to use the max space if buttons are hidden, or title is hidden, and allows scrollbar
    Alert.$("#alertJs-message").css("max-height", Alert._calculateMessageHeight(height, padding, buttons.length, title));

    // Set the padding of the light-box
    Alert.$(".alert-js-RefreshDialog-Warning").css("left", padding).css("right", padding);
    Alert.$(".alert-js-td").css("padding-top", padding).css("padding-bottom", padding);

    // Show the alert wrapper
    Alert.$("#alertJs-wrapper").show();

    // Set focus to the button(s) if applicable
    Alert.$(".alert-js-RefreshDialog-Button-focus").focus();
}

// Hide the alert manually without performing any callbacks
Alert.hide = function () {
    if (Alert._initialised) {
        Alert.$("#alertJs-wrapper").hide();
    }
}

// Calculates the height of the sub-heading/message based on other variables
Alert._calculateMessageHeight = function (dialogHeight, dialogPadding, buttonLength, title) {
    return dialogHeight - (dialogPadding * 2) - (buttonLength > 0 ? 44 : 0) - (title != null && title != "" ? 32 : 0);
}

// Internal button click event
Alert._buttonClicked = function (callback, preventClose) {
    Alert.$(".alert-js-RefreshDialog-Button").prop("disabled", true);

    try {
        // Unless specified, close the alert after executing the callback
        if (!preventClose) {
            Alert.hide();
        }

        // Calls the callback function (after closing the previous alert in case we show another alert)
        if (callback) {
            callback();
        }
    } catch (e) {
        alert(e);
    }

    Alert.$(".alert-js-RefreshDialog-Button").prop("disabled", false);
}

// Encode the Title or Message to display xml tags, e.g. from a plugin error trace
// Also replaces javascript line breaks with <br>
Alert.htmlEncode = function (text) {
    if (text == null || typeof text !== "string") { return text; }

    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/  /g, '&nbsp;&nbsp;').replace(/\n/g, '<br />');
}

Alert.showLoading = function (url) {
    Alert.show("Loading...", null, [], "LOADING", 230, 115, url, true);
}

Alert.showWebResource = function (webResourceName, width, height, title, buttons, baseUrl, preventCancel, padding) {
    baseUrl = baseUrl || Xrm.Page.context.getClientUrl();

    var iframeUrl = baseUrl + "/webresources/" + webResourceName;

    Alert.showIFrame(iframeUrl, width, height, title, buttons, baseUrl, preventCancel, padding);
}

Alert.showDialogProcess = function (dialogId, entityName, recordId, callback, width, height, baseUrl) {
    baseUrl = baseUrl || Xrm.Page.context.getClientUrl();

    var dialogUrl = baseUrl + "/cs/dialog/rundialog.aspx?DialogId=%7b" + dialogId + "%7d&EntityName=" + entityName + "&ObjectId=" + recordId;

    Alert.showIFrame(dialogUrl, width, height, null, null, baseUrl);

    // Handle the callback and close actions (otherwise it tries to close the whole form, rather than the popup)
    var $frame = Alert.$("#alertJs-iFrame");
    $frame.load(function () {
        try {
            // Override the CRM closeWindow function (unsupported)
            var frameDoc = $frame[0].contentWindow;
            frameDoc.closeWindow = function () {
                // Fire the callback and close
                if (callback) { callback(); }

                Alert.hide();
            }
        } catch (e) { }
    });
}

Alert.showIFrame = function (iframeUrl, width, height, title, buttons, baseUrl, preventCancel, padding) {
    width = width || 800;
    height = height || 600;
    buttons = buttons || []; // No buttons displayed if null, rather than 'OK'
    if (padding === undefined || padding === null) { padding = 0; }

    var iframeHtml = "<iframe id='alertJs-iFrame' class='alert-js-iframe' src='" + Alert.htmlEncode(iframeUrl) + "'></iframe>";

    Alert.show(title, iframeHtml, buttons, null, width, height, baseUrl, preventCancel, padding);

    // Set a fixed height on the iframe (minus 3 for some reason) - it doesn't like relative heights, i.e. calc(100% - 3)
    Alert.$("#alertJs-iFrame").css("height", Alert._calculateMessageHeight(height, padding, buttons.length, title) - 3);
}

// Use the returned iframe context with jQuery to get data from the iframe, i.e. Alert.$("#something", Alert.getIFrameWindow().document);
Alert.getIFrameWindow = function () {
    var iframeContext = null;

    if (Alert._initialised) {
        var iframe = Alert.$("#alertJs-iFrame");

        if (iframe.length > 0) {
            try {
                iframeContext = iframe[0].contentWindow;
            }
            catch (e) { }
        }
    }

    return iframeContext;
}

// Get the CRM window from inside an iframe to access custom functions, e.g. parent.Alert.getCrmWindow().doSomething();
Alert.getCrmWindow = function () {
    return Alert._crmContext;
}

// Helper to build the buttons
Alert.Button = function (label, callback, setFocus, preventClose) {
    this.label = label;
    this.callback = callback;
    this.setFocus = setFocus;
    this.preventClose = preventClose;
}

// Title of the Alert
Alert.prototype.setTitle = function (title) {
    this.title = title;
    return this;
}

// Main body of the Alert
Alert.prototype.setMessage = function (message) {
    this.message = message;
    return this;
}

// Array of new Alert.Button() to show on the Alert
Alert.prototype.setButtons = function (buttons) {
    if (buttons === undefined) { buttons = []; }
    this.buttons = buttons;
    return this;
}

// INFORMATION
// WARNING
// ERROR
// QUESTION
// SUCCESS
// LOADING
Alert.prototype.setIcon = function (icon) {
    this.icon = icon;
    return this;
}

// Whole number, width of the Alert
Alert.prototype.setWidth = function (width) {
    this.width = width;
    return this;
}

// Whole number, height of the Alert
Alert.prototype.setHeight = function (height) {
    this.height = height;
    return this;
}

Alert.prototype.setBaseUrl = function (baseUrl) {
    this.baseUrl = baseUrl;
    return this;
}

Alert.prototype.preventCancel = function (isPreventCancel) {
    if (isPreventCancel === undefined) { isPreventCancel = true; }
    this.isPreventCancel = isPreventCancel;
    return this;
}

// Whole number, number of pixels padding the Alert
Alert.prototype.setPadding = function (padding) {
    if (padding === undefined) { padding = 0; }
    this.padding = padding;
    return this;
}

Alert.prototype.show = function () {
    Alert.show(this.title, this.message, this.buttons, this.icon, this.width, this.height, this.baseUrl, this.isPreventCancel, this.padding);
}

Alert.prototype.hide = function () {
    Alert.hide();
}

Alert.prototype.getIFrameWindow = function () {
    return Alert.getIFrameWindow();
}

Alert.prototype.getCrmWindow = function () {
    return Alert.getCrmWindow();
}

Alert.prototype.showLoading = function () {
    Alert.showLoading();
}

Alert.prototype.showWebResource = function (webResourceName) {
    Alert.showWebResource(webResourceName, this.width, this.height, this.title, this.buttons, this.baseUrl, this.isPreventCancel, this.padding);
}

Alert.prototype.showDialogProcess = function (dialogId, entityName, recordId, callback) {
    Alert.showDialogProcess(dialogId, entityName, recordId, callback, this.width, this.height, this.baseUrl);
}

Alert.prototype.showIFrame = function (iframeUrl) {
    Alert.showIFrame(iframeUrl, this.width, this.height, this.title, this.buttons, this.baseUrl, this.isPreventCancel, this.padding);
}