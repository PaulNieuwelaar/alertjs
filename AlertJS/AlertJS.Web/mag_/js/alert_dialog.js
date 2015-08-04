$(document).ready(function () {
    var qs = getQueryStrings();

    var title = getQueryString("title", qs);
    var message = getQueryString("message", qs);
    var buttons = getQueryString("buttons[]", qs);
    var icon = getQueryString("icon", qs);

    $("#title").html(title);
    $("#message").html(message);

    if (icon && ["INFO", "WARNING", "ERROR", "SUCCESS", "QUESTION"].indexOf(icon) !== -1) {
        var imgType = icon == "ERROR" ? "crit" : icon == "WARNING" ? "warn" : icon == "INFO" ? "info" : icon == "SUCCESS" ? "tick" : "ques";

        $("#image").addClass("image-" + imgType);
    }
    else {
        $("#imageWrapper").addClass("hide");
    }

    for (var i = 0; i < buttons.length; i++) {
        var $button = $("<button>", { tabindex: "1", type: "button" });
        $button.addClass("ms-crm-RefreshDialog-Button");
        $button.html(buttons[i]);
        $button.click(function () {
            buttonClicked(this);
        });

        $("#tdDialogFooter").append($button);
    }
});

function buttonClicked(button) {
    $(".ms-crm-RefreshDialog-Button").prop("disabled", true);

    var callbackFunction = null;
    if (getDialogArguments && getDialogArguments() && getDialogArguments().Alert) {
        // Handles CRM lightbox && window.showModalDialog && window.showModelessDialog
        callbackFunction = getDialogArguments().Alert._callback;
    }
    else if (typeof dialogArguments !== "undefined" && dialogArguments.Alert) {
        // Handles window.showModalDialog && window.showModelessDialog if getDialogArguments() breaks/stops working
        callbackFunction = dialogArguments.Alert._callback;
    }
    else if (window.opener && window.opener.Alert) {
        // Handles window.open
        callbackFunction = window.opener.Alert._callback;
    }

    if (callbackFunction) {
        var label = $(button).html();
        try {
            callbackFunction(label);
        } catch (e) { }
    }

    if (closeWindow != null) {
        closeWindow();
    }
    else {
        window.close();
    }
}

// Get all the custom querystrings passed to the web resource
function getQueryStrings() {
    var qs = null;

    if (location.search != "") {
        // Get all the query strings
        var qs = location.search.substr(1).split("&");
        for (var i = 0; i < qs.length; i++) {
            qs[i] = qs[i].replace(/\+/g, " ").split("=");
        }

        // Look for the parameter named 'data' (contains all our custom qs's)
        var data = "";
        for (var i = 0; i < qs.length; i++) {
            if (qs[i][0].toLowerCase() == "data") {
                data = qs[i][1];
                break;
            }
        }

        // Get all of our query strings
        if (data != "") {
            var vals = decodeURIComponent(data).split("&");
            for (var i = 0; i < vals.length; i++) {
                vals[i] = vals[i].replace(/\+/g, " ").split("=");
            }

            qs = vals;
        }
    }

    return qs;
}

// Get the value of a specific querystring
function getQueryString(key, qs) {
    var value = "";
    var isArray = false;
    if (key.indexOf("[]") > 0) {
        value = [];
        isArray = true;
    }

    for (var i = 0; i < qs.length; i++) {
        if (qs[i][0].toLowerCase() == key.toLowerCase()) {
            var val = qs[i][1];
            if (isArray) {
                value.push(val);
            }
            else {
                value = val;
                break;
            }
        }
    }

    return value;
}

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) { return i; }
        }
        return -1;
    }
}