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

Alert._dialogHeight = 225;
Alert._dialogWidth = 450;

Alert._callbackFunctions = [];

Alert._callback = function (value) {
    if (value !== null && value !== undefined) {
        for (var i = 0; i < Alert._callbackFunctions.length; i++) {
            if (Alert._callbackFunctions[i].label == value) {
                var callback = Alert._callbackFunctions[i].callback;
                if (callback) {
                    callback();
                    break;
                }
            }
        }
    }
}

// purpose: open a webpage in a CRM lightbox (web) or modal dialog (outlook)
// Works well for CRM dialog processes, web resources, or any other alert style webpage
Alert.tryShowDialog = function (url, width, height, callback, baseUrl) {
    width = width || Alert._dialogWidth;
    height = height || Alert._dialogHeight;

    var isOpened = false;

    try {
        // Web (IE, Chrome, FireFox)
        var Mscrm = Mscrm && Mscrm.CrmDialog && Mscrm.CrmUri && Mscrm.CrmUri.create ? Mscrm : parent.Mscrm;
        if (Mscrm && Mscrm.CrmDialog && Mscrm.CrmUri && Mscrm.CrmUri.create) {
            // Use CRM light-box (unsupported)
            var crmUrl = Mscrm.CrmUri.create(url);
            var dialogwindow = new Mscrm.CrmDialog(crmUrl, window, width, height);

            // Allows for opening non-webresources (e.g. dialog processes) - CRM messes up when it's not a web resource (unsupported)
            if (!crmUrl.get_isWebResource()) {
                crmUrl.get_isWebResource = function () { return true; }
            }

            // Open the lightbox
            dialogwindow.show();
            isOpened = true;

            // Make sure when the dialog is closed, the callback is fired
            // This part's all pretty unsupported, hence the try-catches
            if (callback) {
                try {
                    // Get the lightbox iframe (unsupported)
                    var $frame = parent.$("#InlineDialog_Iframe");
                    $frame.load(function () {
                        try {
                            // Override the CRM closeWindow function (unsupported)
                            var frameDoc = $frame[0].contentWindow;
                            var closeEvt = frameDoc.closeWindow; // OOTB close function
                            frameDoc.closeWindow = function () {
                                // Bypasses onunload event on dialogs to prevent "are you sure..." (unsupported)
                                try { frameDoc.Mscrm.GlobalVars.$B = false; } catch (e) { }

                                // Fire the callback and close
                                callback();
                                try { closeEvt(); } catch (e) { }
                            }
                        } catch (e) { }
                    });
                } catch (e) { }
            }
        }
    } catch (e) { }

    try {
        // Outlook
        if (!isOpened && window.showModalDialog) {
            // If lightbox fails, use window.showModalDialog
            baseUrl = baseUrl || Xrm.Page.context.getClientUrl();
            var params = "dialogWidth:" + width + "px; dialogHeight:" + height + "px; status:no; scroll:no; help:no; resizable:yes";

            window.showModalDialog(baseUrl + url, window, params);
            if (callback) {
                callback();
            }

            isOpened = true;
        }
    } catch (e) { }

    return isOpened;
}

// purpose: display an alert style dialog for the user using the CRM lightbox (web) or modal dialog (outlook)
// Allows for custom buttons and callbacks
// title = Main big message
// message = (optional) Sub-heading shown below the title
// buttons = (otional, defaults to 'Ok') Array of buttons and callback functions for each button. Callbacks optional. E.g. [{label: "OK", callback: function(){}},{label: "Cancel"}]
// icon = (optional, defaults to none) Displays a custom icon on the alert: INFO, WARNING, ERROR, SUCCESS, QUESTION
// width = (optional, defaults to _dialogWidth) Custom width of the dialog
// height = (optional, defaults to _dialogHeight) Custom height of the dialog
// baseUrl = (optional, defaults to getClientUrl) Base url of CRM (only required if no access to Xrm.Page)
Alert.show = function (title, message, buttons, icon, width, height, baseUrl) {
    width = width || Alert._dialogWidth;
    height = height || Alert._dialogHeight;
    buttons = buttons || [{ label: "OK" }];

    Alert._callbackFunctions = buttons;

    var queryStrings = "title=" + (title || "") + "&message=" + (message || "") + "&icon=" + (icon || "");
    for (var i = 0; i < buttons.length; i++) {
        queryStrings += "&buttons[]=" + buttons[i].label;
    }

    var url = "/webresources/mag_/html/alert_dialog.html?Data=" + encodeURIComponent(queryStrings);

    // Our web resource handles the callback functions since they can be different for each button
    if (Alert.tryShowDialog(url, width, height)) { return; }

    // Future proofing...
    baseUrl = baseUrl || Xrm.Page.context.getClientUrl();
    if (window.showModelessDialog) {
        var params = "dialogWidth:" + width + "px; dialogHeight:" + height + "px; status:no; scroll:no; help:no; resizable:yes";
        window.showModelessDialog(baseUrl + url, window, params);
    }
    else if (window.open) {
        // If modal and modeless failed, use window.open since it opens a nice dialog
        var left = (screen.width / 2) - (width / 2);
        var top = (screen.height / 2) - (height / 2);
        var params = "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + width + ", height=" + height + ", top=" + top + ", left=" + left;

        window.open(baseUrl + url, null, params);
    }
        // If the dialog couldn't open let's try a few more options
    else if (Xrm && Xrm.Utility && Xrm.Utility.openWebResource) {
        // If window.open doesn't work, try the supported openWebResource method which opens new tab
        Xrm.Utility.openWebResource("mag_/html/alert_dialog.html", encodeURIComponent(queryStrings), width, height);
    }
    else if (buttons.length == 1) {
        // If window.open fails, and there's only 1 button, display an alert
        if (Xrm && Xrm.Utility && Xrm.Utility.alertDialog) {
            Xrm.Utility.alertDialog(title, buttons[0].callback);
        }
        else {
            alert(title);
            if (buttons[0].callback) {
                buttons[0].callback();
            }
        }
    }
    else if (buttons.length == 2) {
        // If window.open fails, and there's 2 buttons, display a confirm (assumes the 'ok' button is on the left)
        if (Xrm && Xrm.Utility && Xrm.Utility.confirmDialog) {
            Xrm.Utility.confirmDialog(title, buttons[0].callback, buttons[1].callback);
        }
        else {
            if (confirm(title)) {
                if (buttons[0].callback) {
                    buttons[0].callback();
                }
            }
            else {
                if (buttons[1].callback) {
                    buttons[1].callback();
                }
            }
        }
    }
    else {
        // If all else fails, display an error occurred message
        if (Xrm && Xrm.Utility && Xrm.Utility.alertDialog) {
            Xrm.Utility.alertDialog("An error has occurred while generating this message. Please contact your CRM Administrator.");
        }
        else {
            alert("An error has occurred while generating this message. Please contact your CRM Administrator.");
        }
    }
}