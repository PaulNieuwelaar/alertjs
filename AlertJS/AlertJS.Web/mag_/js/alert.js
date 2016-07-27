/*    
Alert.show("Would you like to create a new Sale?", null,
    [{
        label: "Create Sale",
        callback: function () {
            Alert.show("Sale created successfully!", null, null, "SUCCESS", 500, 200);
        }
    },
    {
        label: "Not now"
    }], "QUESTION", 500, 200);
*/

var Alert = Alert || {};

Alert._prefix = "mag_"; // Change this if you have your own solution prefix (as long as the file structure's the same)
Alert._dialogHeight = 250;
Alert._dialogWidth = 500;

Alert._initialised = false;
Alert._context = null;

// purpose: display an alert style dialog for the user using a styled CRM lightbox
// Allows for custom buttons and callbacks
// title = Main big message
// message = (optional) Sub-heading shown below the title
// buttons = (otional, defaults to 'Ok') Array of buttons and callback functions for each button. Callbacks optional. E.g. [{label: "OK", callback: function(){}},{label: "Cancel"}]
// icon = (optional, defaults to none) Displays a custom icon on the alert: INFO, WARNING, ERROR, SUCCESS, QUESTION
// width = (optional, defaults to _dialogWidth) Custom width of the dialog
// height = (optional, defaults to _dialogHeight) Custom height of the dialog
// baseUrl = (optional, defaults to getClientUrl) Base url of CRM (only required if no access to Xrm.Page)
// preventCancel = (optional, defaults to false) Hides the 'X' in the top right corner, meaning you can only dismiss the alert using the buttons
Alert.show = function (title, message, buttons, icon, width, height, baseUrl, preventCancel) {
    title = title || "";
    message = message || "";
    width = width || Alert._dialogWidth;
    height = height || Alert._dialogHeight;
    buttons = buttons || [{ label: "OK" }];
    baseUrl = baseUrl || Xrm.Page.context.getClientUrl();

    if (!Alert._initialised) {
        // The parent/top document which we append the wrapper to
        Alert._context = window.top.document;

        // The wrapper sits outside the form, so it may exist even if Alert.js is not initialised
        var alertJsWrapper = $("#alertJs-wrapper", Alert._context);
        if (alertJsWrapper == null || alertJsWrapper.length == 0) {
            var alertJsHtml =
                "<div id='alertJs-wrapper' class='alert-js-wrapper'>" +
                  "<link rel='stylesheet' href='" + baseUrl + "/WebResources/" + Alert._prefix + "/css/alert.css' />" +
                  "<div class='alert-js-background'></div>" +
                  "<div id='alertJs-dialog' class='alert-js-dialog'>" +
                    "<div id='alertJs-closeWrapper' class='alert-js-close-wrapper'>" +
                      "<div id='alertJs-close' class='alert-js-close' title='Cancel'></div>" +
                    "</div>" +
                    "<div class='alert-js-RefreshDialog-Warning' id='alertJs-divWarning'>" +
                      "<table class='alert-js-table-wrapper' cellspacing='0' cellpadding='0'>" +
                        "<tr id='alertJs-errorRow' class='alert-js-ErrorMessage-row'>" +
                          "<td id='alertJs-imageWrapper' class='alert-js-image-td'>" +
                            "<div id='alertJs-image' class='alert-js-image'></div>" +
                          "</td>" +
                          "<td class='alert-js-error-td'>" +
                            "<div class='alert-js-Error-Header ms-crm-Field-Data-Print' id='alertJs-title'></div>" +
                            "<div class='alert-js-Error-Message ms-crm-Field-Data-Print' id='alertJs-message'></div>" +
                          "</td>" +
                        "</tr>" +
                      "</table>" +
                    "</div>" +
                    "<div class='alert-js-RefreshDialog-Footer' id='alertJs-tdDialogFooter'></div>" +
                  "</div>" +
                "</div>";

            $("body", Alert._context).append(alertJsHtml);
        }

        // Attach close event (messes up with jquery)
        var closeButton = $("#alertJs-close", Alert._context);
        if (closeButton && closeButton.length > 0) {
            closeButton[0].onclick = function () {
                Alert.hide();
            };
        }

        Alert._initialised = true;
    }

    // Update the title and message
    $("#alertJs-title", Alert._context).html(title);
    $("#alertJs-message", Alert._context).html(message);

    // Add the icon
    if (icon && ["INFO", "WARNING", "ERROR", "SUCCESS", "QUESTION"].indexOf(icon) !== -1) {
        var imgType = icon == "ERROR" ? "crit" : icon == "WARNING" ? "warn" : icon == "INFO" ? "info" : icon == "SUCCESS" ? "tick" : "ques";

        $("#alertJs-imageWrapper", Alert._context).removeClass("alert-js-hide");

        // Remove any existing image classes before adding the new one
        $("#alertJs-image", Alert._context)
            .removeClass("alert-js-image-crit alert-js-image-warn alert-js-image-info alert-js-image-tick alert-js-image-ques")
            .addClass("alert-js-image-" + imgType);;
    }
    else {
        $("#alertJs-imageWrapper", Alert._context).addClass("alert-js-hide");
    }

    // Delete existing buttons
    $("#alertJs-tdDialogFooter", Alert._context).empty();

    // Create new buttons
    for (var i = 0; i < buttons.length; i++) {
        var $button = $("<button>", { tabindex: "1", type: "button" });
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

        $("#alertJs-tdDialogFooter", Alert._context).append($button);
    }

    // Set focus to the button(s) if applicable
    $(".alert-js-RefreshDialog-Button-focus", Alert._context).focus();

    // Show or hide the manual cancel button
    if (preventCancel) { $("#alertJs-closeWrapper", Alert._context).hide(); }
    else { $("#alertJs-closeWrapper", Alert._context).show(); }

    // Makes the formatting nicer if the popup is huge (for displaying trace logs etc)
    if (height > 250) { $("#alertJs-errorRow", Alert._context).addClass("alert-js-ErrorMessage-row-top"); }
    else { $("#alertJs-errorRow", Alert._context).removeClass("alert-js-ErrorMessage-row-top"); }

    // Set height/width of the alert
    $("#alertJs-dialog", Alert._context).css("height", height).css("width", width).css("margin-top", height * -0.5).css("margin-left", width * -0.5);
    $("#alertJs-message", Alert._context).css("max-height", height - 140);

    // Show the alert wrapper
    $("#alertJs-wrapper", Alert._context).show();
}

// Hide the alert manually without performing any callbacks
Alert.hide = function () {
    if (Alert._initialised) {
        $("#alertJs-wrapper", Alert._context).hide();
    }
}

Alert._buttonClicked = function (callback, preventClose) {
    $(".alert-js-RefreshDialog-Button", Alert._context).prop("disabled", true);

    try {
        // Calls the callback function
        if (callback) {
            callback();
        }

        // Unless specified, close the alert after executing the callback
        if (!preventClose) {
            Alert.hide();
        }
    } catch (e) {
        alert(e);
    }

    $(".alert-js-RefreshDialog-Button", Alert._context).prop("disabled", false);
}

// Encode the Title or Message to display xml tags, e.g. from a plugin error trace
// Also replaces javascript line breaks with <br>
Alert.htmlEncode = function (s) {
    if (s == null || typeof s !== "string") { return s; }

    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/  /g, '&nbsp;&nbsp;').replace(/\n/g, '<br />');
}

// Helper to build the buttons
Alert.Button = function (label, callback, setFocus, preventClose) {
    this.label = label;
    this.callback = callback;
    this.setFocus = setFocus;
    this.preventClose = preventClose;
}