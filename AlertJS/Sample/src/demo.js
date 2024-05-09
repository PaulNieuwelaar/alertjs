async function onLoad() {
    var examples = [];

    // Simple dialog with callback
    examples.push({
        blurb: "Simple dialog with callback",
        id: "simplecallback",
        imageUrl: "https://user-images.githubusercontent.com/14048382/86217559-c1139100-bbd3-11ea-9dd1-edf455430eac.png",
        code: `new Dialog({
    title: "Would you like to create a sale?",
    message: "This will create and open the new sale record",
    icon: "INFO",
    buttons: [
        new Dialog.Button("Create Sale", function() {
            new Dialog({
                title: "Sale successfully created!",
                icon: "SUCCESS"
            }).show();
        }, true),
        new Dialog.Button("Not now")
    ]
}).show();`
    });

    // Recreate the Close Opportunity screen
    examples.push({
        blurb: "Recreate the Close Opportunity screen",
        id: "opportunity",
        imageUrl: "https://user-images.githubusercontent.com/14048382/86326459-d81ab780-bc95-11ea-88cb-02b50f85724b.png",
        code: `new Dialog({
    id: "closeOpp",
    height: 480,
    width: 450,
    title: "Close Opportunity",
    message: "Provide the following information about why this opportunity is being closed.",
    buttons: [
        new Dialog.Button("OK", null, true),
        new Dialog.Button("Cancel")
    ],
    fields: [
        new Dialog.OptionSet({ id: "status", label: "Status Reason", value: 3, options: [
            { text: "Won", value: 3 },
            { text: "Canceled", value: 4 },
            { text: "Out-Sold", value: 5 }] }),
        new Dialog.Input({ id: "revenue", label: "Actual Revenue ($)", type: "number", value: "0.00" }),
        new Dialog.Input({ id: "closedate", label: "Close Date", type: "date", value: new Date() }),
        new Dialog.Lookup({ id: "competitor", label: "Competitor", entityTypes: ["competitor"] }),
        new Dialog.MultiLine({ id: "description", label: "Description" })
    ]
}).show();` });

    // Recreate the Assign Records screen with disabled fields
    examples.push({
        blurb: "Recreate the Assign Records screen with disabled fields",
        id: "assign",
        imageUrl: "https://user-images.githubusercontent.com/14048382/90304139-9e7dd300-df08-11ea-81d9-af5823aeb869.png",
        code: `var dialog = new Dialog({
    id: "assign",
    height: 300,
    width: 400,
    title: "Assign Lead",
    message: "You have selected 1 Lead. To whom would you like to assign it?",
    buttons: [
        new Dialog.Button("Assign", function (results) {
            if (results.getValue("assignto").getValue("assignuser") && results.getValue("userorteam") == null) {
                new Dialog({
                    icon: "ERROR",
                    title: "Required fields",
                    message: "You must provide a value for User or team.",
                    width: 320,
                    height: 180
                }).show();
            }
            else {
                dialog.close();
            }
        }, true, true),
        new Dialog.Button("Cancel")
    ],
    fields: [
        new Dialog.Group({
            id: "assignto", label: "Assign to", inline: true, fields: [
                new Dialog.Input({ id: "assignme", type: "radio", label: "Me", value: true }, { name: "assignto" }),
                new Dialog.Input({ id: "assignuser", type: "radio", label: "User or team" }, { name: "assignto" }),
            ]
        }),
        new Dialog.Lookup({ id: "userorteam", label: "User or team", entityTypes: ["systemuser", "team"] })
    ]
}).show();

var userOrTeamInput = dialog.getElement("#userorteam input");
userOrTeamInput.disabled = true;

dialog.getElement("#assignme input").addEventListener("click", function () {
    userOrTeamInput.disabled = true;
});
dialog.getElement("#assignuser input").addEventListener("click", function () {
    userOrTeamInput.disabled = false;
    userOrTeamInput.focus();
});` });

    // Example using file upload, and using the base64 data to display the image on screen
    examples.push({
        blurb: "Example using file upload, and using the base64 data to display the image on screen",
        id: "fileupload",
        imageUrl: "https://user-images.githubusercontent.com/14048382/86326576-08625600-bc96-11ea-911e-a3f6b291a72b.png",
        code: `new Dialog({
    id: "image",
    width: 380,
    height: 200,
    title: "Image Preview",
    message: "Please select an image file you wish to preview.",
    buttons: [
        new Dialog.Button("View", function (results) {
            var img = results.getValue("img");
            if (img != null && img.length > 0) {
                new Dialog({
                    id: "image",
                    width: 650,
                    height: 500,
                    content: "<img src='data:" + img[0].type + ";base64," + img[0].value + "' style='width:100%' />"
                }).show();
            }
            else {
                new Dialog({
                    title: "404",
                    message: "Image not found.",
                    icon: "ERROR",
                    height: 150,
                    width: 230
                }).show();
            }
        }, true, true),
        new Dialog.Button("Cancel")
    ],
    fields: [
        new Dialog.Input({
            id: "img",
            label: "Image",
            type: "file"
        }, { accept: "image/*" })
    ]
}).show();` });

    // Using various different field types
    examples.push({
        blurb: "Using various different field types",
        id: "variousfields",
        imageUrl: "https://user-images.githubusercontent.com/14048382/86327421-680d3100-bc97-11ea-9f9b-551f366223ff.png",
        code: `new Dialog({
    height: 700,
    padding: 20,
    title: "Using various different field types",
    message: "Select some stuff from all the different field types",
    icon: "SUCCESS",
    fields: [
        new Dialog.Input({ type: "number", label: "Number" }),
        new Dialog.Input({ type: "file", label: "File" }),
        new Dialog.Input({ type: "date", label: "Date" }),
        new Dialog.Lookup({ label: "Lookup", entityTypes: ["contact"] }),
        new Dialog.Group({ label: "Inline Group", inline: true, fields: [
            new Dialog.Input({ label: "Click this", type: "radio", value: true }, { name: "clickThis" }),
            new Dialog.Input({ label: "Or this", type: "radio" }, { name: "clickThis" }),
            new Dialog.Input({ label: "Or check this", type: "checkbox", value: true })
        ] }),
        new Dialog.OptionSet({ label: "OptionSet", options: [
            { text: "One", value: "1" },
            { text: "Two", value: "2" }
        ] }),
        new Dialog.MultiLine({ label: "MultiLine", inline: false })
    ]
}).show();`
    });

    // Login screen with custom keypress event
    examples.push({
        blurb: "Login screen with custom keypress event",
        id: "loginkeypress",
        imageUrl: "https://user-images.githubusercontent.com/14048382/86327927-2466f700-bc98-11ea-8d6a-6435b6d74576.png",
        code: `function signInCallback(data) {
    new Dialog({
        title: data.getValue(0).getValue("email") + "<br />" + data.getValue(0).getValue("password")
    }).show();
}
var dialog = new Dialog({
    icon: "SEARCH",
    title: "Portal Sign-in",
    message: "Please enter your login details below (don't worry this is all client side).",
    height: 300,
    buttons: [
        new Dialog.Button("Sign in", signInCallback, true),
        new Dialog.Button("Cancel")
    ],
    fields: [
        new Dialog.Group({
            label: "Login details",
            fields: [
                new Dialog.Input({ id: "email", label: "Email", type: "email" }),
                new Dialog.Input({ id: "password", label: "Password", type: "password" })
            ]
        })
    ]
}).show();
dialog.getElement("#password input").addEventListener("keydown", function (e) {
    e = e || window.event;
    if (e.which == 13) { // Enter
        e.preventDefault();
        signInCallback(dialog.getPromptResponses());
    }
});`
    });

    // Progress bar for async tasks
    examples.push({
        blurb: "Progress bar for async tasks",
        id: "progressbar",
        imageUrl: "https://user-images.githubusercontent.com/14048382/86429346-639e5200-bd43-11ea-8c09-65bb693f851c.png",
        code: `var data = ["Some", "data", "to", "process", "async", "via", "webapi", "etc"];
var loading = new Dialog({ id: "loading", title: "Processing..." }).showLoading();

for (var i = 1; i <= data.length; i++) {
    loading.message("Record " + i + " of " + data.length);

    // Do something async (waits 1 second)
    await new Promise(resolve => setTimeout(resolve, 1000));
}

loading.close();

new Dialog({ icon: "SUCCESS", title: "Process complete!" }).show();`
    });

    // Displaying a simple IFrame
    examples.push({
        blurb: "Displaying a simple IFrame",
        id: "iframe",
        imageUrl: "https://user-images.githubusercontent.com/14048382/86431682-86336980-bd49-11ea-955f-ec9b2c6ba684.png",
        code: `new Dialog({
    title: "Just Bing it!",
    message: "Google doesn't allow embedding in a frame.",
    icon: "SEARCH",
    buttons: [
        new Dialog.Button("Open New Tab", function() {
            window.open("https://bing.com");
        }),
        new Dialog.Button("Close", null, true)
    ]
}).showIFrame("https://bing.com");`
    });

    // Showing filtered lookup/search results as a list of options
    examples.push({
        blurb: "Showing filtered lookup/search results as a list of options",
        id: "filteredsearch",
        imageUrl: "https://user-images.githubusercontent.com/14048382/86499824-4a4be300-bde1-11ea-8f1d-d1bdb81053e5.png",
        code: `function searchAccounts(dialog, searchTerm) {
    var loading = new Dialog({ id: "loading" }).showLoading();
    searchTerm = (searchTerm || "").toLowerCase();

    setTimeout(function () {
        var accounts = ["ABC Limited", "Contoso", "Dialog Builder",
            "Fabrikam", "Magnetism", "Microsoft"];
        accounts = accounts.filter(a => a.toLowerCase().indexOf(searchTerm) != -1);
        accounts = accounts.map(function (a) { return { name: a, accountid: a } });
        showSearchPrompt(dialog, searchTerm, accounts);
        loading.close();
    }, 1000);
    //Xrm.WebApi.retrieveMultipleRecords("account",
    //    "?$select=name,accountid" +
    //    "&$filter=statecode eq 0 and contains(name,'" + searchTerm + "')" +
    //    "&$orderby=name")
    //    .then(function (results) {
    //        var accounts = results.entities;
    //        showSearchPrompt(dialog, searchTerm, accounts);
    //        loading.close();
    //    });
}

function showSearchPrompt(dialog, searchTerm, data) {
    var fields = data.map(function (account) {
        return new Dialog.Input({
            type: "radio",
            label: account.name,
            id: account.accountid,
            value: data.length == 1
        }, { name: "accounts" });
    });
    if (fields.length == 0) {
        fields.push(new Dialog.Group({ label: "No results" }));
    }

    setDialogFields(dialog, searchTerm, fields);

    dialog.getElement("#searchField input").addEventListener("keydown", function (e) {
        e = e || window.event;
        if (e.which == 13) { // Enter
            e.preventDefault();
            searchAccounts(dialog, dialog.getPromptResponses().getValue("searchField"));
        }
    });
    dialog.getElement("#searchButton input").addEventListener("click", function (e) {
        searchAccounts(dialog, dialog.getPromptResponses().getValue("searchField"));
    });
}

function setDialogFields(diolog, searchTerm, fields) {
    dialog.fields([
            new Dialog.Input({ id: "searchField", label: "Search for an Account", inline: false, value: searchTerm }),
            new Dialog.Input({ id: "searchButton", type: "button", value: "Search"},
                { style: "background-color: #236099; color: #fff; width: 100px; cursor: pointer" }),
            new Dialog.Group({ id: "account", fields: fields })
        ]);
}

var dialog = new Dialog({
        title: "Select an Account",
        message: "Select or search for an account.",
        icon: "SEARCH",
        height: 530,
        buttons: [
            new Dialog.Button("OK", function (data) {
                var accountId = data.getValue("account").getSelected();
                if (accountId == null || accountId.length == 0) {
                    alert("Please select an account");
                    return;
                }
                alert(accountId[0]);
                dialog.close();
            }, true, true),
            new Dialog.Button("Cancel")
        ]
    }).show();

setDialogFields(dialog);
searchAccounts(dialog);`
    });

    // Time tracker with required fields validation
    examples.push({
        blurb: "Time tracker with required fields validation",
        id: "timetracker",
        imageUrl: "https://user-images.githubusercontent.com/14048382/87120947-d1172900-c2d5-11ea-80ad-020f306832c3.png",
        code: `var timeTracker = new Dialog({
    id: "timetracker",
    icon: "https://user-images.githubusercontent.com/14048382/87119185-5ea44a00-c2d1-11ea-89df-8367771f6344.png",
    title: "Time Tracker",
    message: "Enter the details for the time entry against the ticket.",
    height: 420,
    width: 400,
    buttons: [
        new Dialog.Button("Submit", submitTime, true, true),
        new Dialog.Button("Cancel")
    ],
    fields: [
        new Dialog.Input({ id: "Ticket", label: "Ticket #", type: "number" }, { min: "1000", max: "9999" }),
        new Dialog.Input({ id: "Date", label: "Date", type: "date", value: new Date() }),
        new Dialog.Input({ id: "Duration", label: "Duration (hours)", type: "number" },
            {
                min: "0", max: "12", step: "0.25",
                title: "0.25 = 15 minutes\\n0.5 = 30 minutes\\n0.75 = 45 minutes\\n1 = 1 hour\\n1.25 = 1 hour and 15 minutes"
            }),
        new Dialog.MultiLine({ id: "Description", label: "Description" }, { maxlength: "350" })
    ]
}).show();

function submitTime(results) {
    var nullFields = results.filter(a => a.value == null);
    if (nullFields.length > 0) {
        new Dialog({
            id: "error",
            icon: "ERROR",
            title: "Required fields",
            message: "You must provide a value for: " + nullFields.map(a => a.id).join(", "),
            width: 280,
            height: 180
        }).show();
        return;
    }

    var loading = new Dialog().showLoading();
    setTimeout(function () {
        new Dialog({
            id: "timetracker",
            title: "Success!",
            message: "Your time has been tracked.",
            icon: "SUCCESS",
            width: 300,
            height: 180
        }).show();

        loading.close();
    }, 2000);
}`
    });

    // Create branching dialogs with paging
    examples.push({
        blurb: "Create branching dialogs with paging",
        id: "paging",
        imageUrl: "https://user-images.githubusercontent.com/14048382/92077525-b615f080-ee10-11ea-9cb4-37708e7b9634.png",
        code: `var data = { page1: { subscribe: true }, page2: { interests: {} }, page3: {} };
var dialog = new Dialog({
    id: "onboarding",
    width: 400,
    height: 420,
}).show();
page1();

function page1() {
    dialog.title("Customer Onboarding");
    dialog.message("Page 1 of 3");
    dialog.buttons([
        new Dialog.Button("Next", function (results) {
            // Save the current page data, e.g. data.page1.name, then move to next page
            data.page1 = results.getData();
            if (data.page1.subscribe) {
                page2();
            }
            else {
                // Skip page 2 (Newsletter Interests) if not subscribed
                page3();
            }
        }, true, true),
        new Dialog.Button("Cancel")
    ]);
    dialog.fields([
        new Dialog.Input({ id: "name", label: "Account Name", value: data.page1.name }),
        new Dialog.Input({ id: "accountnumber", label: "Account Number", value: data.page1.accountnumber }),
        new Dialog.Input({ id: "telephone1", label: "Phone Number", value: data.page1.telephone1 }),
        new Dialog.Input({ id: "websiteurl", label: "Website", value: data.page1.websiteurl }),
        new Dialog.Input({ id: "subscribe", label: "Subscribe to Newsletter?", type: "checkbox", value: data.page1.subscribe })
    ]);
}
function page2() {
    dialog.title("Newsletter Interests");
    dialog.message("Page 2 of 3");
    dialog.buttons([
        new Dialog.Button("Previous", function (results) {
            data.page2 = results.getData();
            page1();
        }, false, true),
        new Dialog.Button("Next", function (results) {
            data.page2 = results.getData();
            page3();
        }, true, true),
        new Dialog.Button("Cancel")
    ]);
    dialog.fields([
        new Dialog.Group({
            id: "interests", label: "Select which topics to follow", fields: [
                new Dialog.Input({ id: "dialogbuilder", label: "Dialog Builder", type: "checkbox", value: data.page2.interests.dialogbuilder }),
                new Dialog.Input({ id: "dynamics365", label: "Dynamics 365", type: "checkbox", value: data.page2.interests.dynamics365 }),
                new Dialog.Input({ id: "microsoft", label: "Microsoft", type: "checkbox", value: data.page2.interests.microsoft }),
                new Dialog.Input({ id: "magnetism", label: "Magnetism", type: "checkbox", value: data.page2.interests.magnetism }),
                new Dialog.Input({ id: "newproducts", label: "New products", type: "checkbox", value: data.page2.interests.newproducts }),
                new Dialog.Input({ id: "whatsnew", label: "What's new", type: "checkbox", value: data.page2.interests.whatsnew }),
            ]
        })
    ]);
}
function page3() {
    dialog.title("Primary Contact");
    dialog.message("Page 3 of 3");
    dialog.buttons([        
        new Dialog.Button("Previous", function (results) {
            data.page3 = results.getData();
            if (data.page1.subscribe) {
                page2();
            }
            else {
                page1();
            }
        }, false, true),
        new Dialog.Button("Finish", function (results) {
            data.page3 = results.getData();

            dialog.title("Summary");
            dialog.message(null);
            dialog.buttons([
                new Dialog.Button("Close")
            ])
            dialog.content(Dialog.htmlEncode(JSON.stringify(data, null, 4)));
            dialog.fields();
        }, true, true),
        new Dialog.Button("Cancel")
    ]);
    dialog.fields([
        new Dialog.Input({ id: "firstname", label: "First Name", value: data.page3.firstname }),
        new Dialog.Input({ id: "lastname", label: "Last Name", value: data.page3.lastname }),
        new Dialog.Input({ id: "title", label: "Job Title", value: data.page3.title }),
        new Dialog.Input({ id: "emailaddress1", label: "Email Address", value: data.page3.emailaddress1 }),
        new Dialog.Input({ id: "telephone1", label: "Phone Number", value: data.page3.telephone1 })
    ]);
}`
    });

    // Customize and build your own dialog right from within Dialog Builder
    examples.push({
        blurb: "Using showAsync and awaiting a response",
        id: "async",
        imageUrl: "https://user-images.githubusercontent.com/14048382/144333620-9592e049-bb2d-4bd6-8587-6d3e8c30a81c.png",
        code: `var dialog = new Dialog({
    id: "async",
    title: "Enter a value to return",
    message: "Code execution will resume once the dialog closes.",
    buttons: [
        new Dialog.Button("OK", function (results) {
            // Validation only
            if (results[0].value == null) {
                new Dialog({ title: "Input required", width: 300, height: 200 }).show();

                // Prevent the await response from firing
                return false;
            }

            // Validation passed
            dialog.close();

            // Fire the await response
            return true;
        }, true, true),
        new Dialog.Button("Cancel")
    ],
    fields: [
        new Dialog.Input({ id: "input", label: "Input" }),
    ]
});

var response = await dialog.showAsync();

if (response.button.label === "OK") {
    var input = response.data.input; // input is the field ID
    new Dialog({ title: input }).show();
}
else {
    // Dialog cancelled or closed
    new Dialog({ title: "Dialog cancelled" }).show();
}`
    });

    // Create a dialog using all the available dialog options
    examples.push({
        blurb: "Create a dialog using all the available dialog options",
        id: "options",
        imageUrl: "https://user-images.githubusercontent.com/14048382/155616396-09953801-d8a2-4766-9aa9-71a304c9f7f9.png",
        code: `var options = {
    id: "new-dialog",
    title: "The main (large) text to display inside the message",
    message: "The sub-heading (smaller) text to display directly below the title.",
    content: "This displays below the title, message, and icon, but above any fields.",
    fields: [
        new Dialog.Input({ id: "input", label: "Input field", value: "Default text" }),
        new Dialog.MultiLine({ id: "multi", label: "MultiLine field", value: "Default text", inline: false }, { style: "height: 200px" }),
    ],
    buttons: [
        new Dialog.Button("OK", function(results) {
            var data = results.getData();
            new Dialog({ content: data.input + "<br>" + data.multi }).show();
        }, true, false),
        new Dialog.Button("Cancel")
    ],
    icon: "INFO",
    width: 800,
    height: 500,
    preventClose: true,
    allowDismiss: true,
    padding: 30,
    fullscreen: false,
    preventResize: false,
    columns: 1,
    color: "#555555"
};

var dialog = new Dialog(options).show();`
    });

    // Customize and build your own dialog right from within Dialog Builder
    examples.push({
        blurb: "Customize and build your own dialog right from within Dialog Builder!",
        id: "builder",
        imageUrl: "https://user-images.githubusercontent.com/14048382/86889882-95068b80-c150-11ea-94f2-08d2d432ae41.png",
        code: `// This is an overly complex example to show just how far this solution can go
var dialog = new Dialog({
    id: "dialogBuilder",
    title: "Dialog Builder... builder",
    message: "Set each option and then view the generated source code, or preview the dialog.",
    icon: "https://user-images.githubusercontent.com/14048382/86503047-34005000-bdfe-11ea-9b72-f7b7ceeeafac.png",
    width: 800,
    height: 950,
    buttons: [
        new Dialog.Button("Add Button", addButton, false, true),
        new Dialog.Button("Add Field", function (results) {
            addField(results, dialog, "dialogBuilder");
        }, false, true),
        new Dialog.Button("View Source", viewSource, true, true),
        new Dialog.Button("Preview", preview, true, true)
    ],
    fields: [
        new Dialog.Group({
            id: "options", label: "Dialog Options", columns: "250px 2", fields: [
                new Dialog.Input({ id: "title", label: "Title" }),
                new Dialog.Input({ id: "message", label: "Message" }),
                new Dialog.Input({ id: "width", label: "Width" }),
                new Dialog.Input({ id: "height", label: "Height" }),
                new Dialog.Input({ id: "icon", label: "Icon" }),
                new Dialog.MultiLine({ id: "content", label: "Content" }, { style: "height: 79px" }),
                new Dialog.Input({ id: "columns", label: "Columns" }),
                new Dialog.Input({ id: "id", label: "ID" }),
                new Dialog.Input({ id: "padding", label: "Padding" }),
                new Dialog.Input({ id: "color", label: "Color" }),
                new Dialog.Input({ id: "preventClose", label: "Prevent Close (hide × button)", type: "checkbox" }),
                new Dialog.Input({ id: "preventResize", label: "Prevent Resize (hide ⛶ button)", type: "checkbox" }),
                new Dialog.Input({ id: "allowDismiss", label: "Allow Dismiss (outside of dialog)", type: "checkbox" }),
                new Dialog.Input({ id: "fullscreen", label: "Fullscreen (by default)", type: "checkbox" })
            ]
        }),
        new Dialog.MultiLine({ id: "buttons", label: "Buttons", inline: false },
            { style: "height: 150px", title: "Example:\\n[\\n    new Dialog.Button(label, callback, setFocus, preventClose)\\n]" }),
        new Dialog.MultiLine({ id: "fields", label: "Fields", inline: false },
            { style: "height: 150px", title: "Example:\\n[\\n    new Dialog.Input(options, extraAttributes)\\n]" })
    ]
}).show();

function viewSource(results) {
    var options = results.getValue("options").getData();

    for (var prop in options) {
        if (options[prop] === null || options[prop] === false) { delete options[prop]; }
    }

    var buttonsString = results.getValue("buttons");
    var fieldsString = results.getValue("fields");

    var buttonsTemp = eval(buttonsString);
    var fieldsTemp = eval(fieldsString);
    options.buttons = buttonsTemp || undefined;
    options.fields = fieldsTemp || undefined;

    var buttonsPlaceholder;
    if (options.buttons) {
        buttonsPlaceholder = jsonStringify(options.buttons, true).replace(/\\n/g, "\\n    ");
    }

    var fieldsPlaceholder;
    if (options.fields) {
        fieldsPlaceholder = jsonStringify(options.fields, true).replace(/\\n/g, "\\n    ");
    }

    var optionsJson = jsonStringify(options, true);
    if (buttonsPlaceholder) { optionsJson = optionsJson.replace(buttonsPlaceholder, buttonsString.replace(/\\n/g, "\\n    ")) }
    if (fieldsPlaceholder) { optionsJson = optionsJson.replace(fieldsPlaceholder, fieldsString.replace(/\\n/g, "\\n    ")) }

    var sourceCode = "new Dialog(" + (optionsJson != "{}" ? optionsJson : "") + ").show();";

    new Dialog({
        id: "viewSource",
        title: "Dialog Source",
        width: 550,
        height: 170 + sourceCode.split("\\n").length * 12,
        content: "<pre>" + sourceCode + "</pre>",
        buttons: [
            new Dialog.Button("Preview", function () { eval(sourceCode); }, false, true),
            new Dialog.Button("Close", null, true),
        ]
    }).show();
}

function preview(results) {
    var options = results.getValue("options").getData();

    for (var prop in options) {
        if (options[prop] === null || options[prop] === false) { delete options[prop]; }
    }

    options.buttons = eval(results.getValue("buttons"));
    options.fields = eval(results.getValue("fields"));

    new Dialog(options).show();
}


function addButton(results) {
    var buttons = eval(results.getValue("buttons")) || [];

    var buttonDialog = new Dialog({
        id: "addButton",
        title: "Add Button",
        width: 400,
        height: 400,
        buttons: [
            new Dialog.Button("Add", function (buttonResults) {
                addButtonCallback(buttonResults, buttons, buttonDialog);
            }, true, true),
            new Dialog.Button("Cancel")
        ],
        fields: [
            new Dialog.Input({ label: "Label", value: "OK" }),
            new Dialog.MultiLine({ label: "Callback", inline: false, value: "function (results) {\\n    \\n}" }),
            new Dialog.Input({ label: "Set Focus (primary button)", value: true, type: "checkbox" }),
            new Dialog.Input({ label: "Prevent Close (keep dialog open)", value: false, type: "checkbox" })
        ]
    }).show();
}

function addButtonCallback(results, buttons, buttonDialog) {
    var label = results.getValue(0);
    var callback = results.getValue(1);
    var setFocus = results.getValue(2);
    var preventClose = results.getValue(3);
    if (callback) { callback = eval("(" + callback.replace(/\\n/g, "\\n    ") + ")"); }

    buttons.push(new Dialog.Button(label, callback, setFocus, preventClose));

    var buttonsText = mapButtonText(buttons);
    dialog.getElement("#buttons textarea").value = buttonsText;

    buttonDialog.close();
}

function mapButtonText(buttons) {
    var buttonsText = buttons.map(a => {
        var buttonParams = [];

        if (a.label) { buttonParams.push('"' + a.label + '"'); }
        else if (a.callback || a.setFocus || a.preventClose) { buttonParams.push("null"); }

        if (a.callback) { buttonParams.push(a.callback.toString()); }
        else if (a.setFocus || a.preventClose) { buttonParams.push("null"); }

        if (a.setFocus) { buttonParams.push(a.setFocus); }
        else if (a.preventClose) { buttonParams.push("null"); }

        if (a.preventClose) { buttonParams.push(a.preventClose); }

        return "    new Dialog.Button(" + buttonParams.join(", ") + ")";
    });

    return "[\\n" + buttonsText.join(",\\n") + "\\n]";
}

function addField(results, dialogContext, id) {
    var fieldsValue = eval(results.getValue("fields")) || [];

    new Dialog({
        id: id + "-addField",
        title: "Add Field",
        width: 300,
        height: 200,
        buttons: [
            new Dialog.Button("Next", function (fieldResults) {
                addFieldType(fieldResults, fieldsValue, dialogContext, id);
            }, true),
            new Dialog.Button("Cancel")
        ],
        fields: [
            new Dialog.OptionSet({
                label: "Type",
                value: "Input",
                options: [
                    { text: "Input", value: "Input" },
                    { text: "OptionSet", value: "OptionSet" },
                    { text: "Lookup", value: "Lookup" },
                    { text: "MultiLine", value: "MultiLine" },
                    { text: "Group", value: "Group" }
                ]
            })
        ]
    }).show();
}

function addFieldType(results, fieldsValue, dialogContext, id) {
    var fieldType = results.getValue(0);

    var fields = [
        new Dialog.Input({ id: "id", label: "ID" }),
        new Dialog.Input({ id: "label", label: "Label" }),
        new Dialog.Input({ id: "inline", label: "Inline (label beside field)", type: "checkbox", value: fieldType != "Group" }),
    ];

    if (fieldType != "Group") {
        fields.push(new Dialog.Input({ id: "value", label: "Value (default)" }));
    }
    if (fieldType == "Input") {
        fields.push(new Dialog.Input({ id: "type", label: "Type (text, number, date, ...)" }));
    }
    if (fieldType == "OptionSet") {
        fields.push(new Dialog.MultiLine({ id: "options", label: "Options (Array)", value: "[\\n    { text: \\"\\", value: \\"\\" },\\n]" }));
    }
    if (fieldType == "Lookup") {
        fields.push(new Dialog.Input({ id: "entityTypes", label: "Entity Types (Array)", value: "[\\"\\"]" }));
        fields.push(new Dialog.Input({ id: "disableMru", label: "Disable Most Recently Used", type: "checkbox" }));
        fields.push(new Dialog.MultiLine({ id: "filters", label: "Filters (Array)" }));
    }
    if (fieldType == "Group") {
        fields.push(new Dialog.Input({ id: "columns", label: "Columns" }));
        fields.push(new Dialog.MultiLine({ id: "fields", label: "Fields", inline: false, value: "[\\n    \\n]" },
            { style: "height: 100px", title: "Example:\\n[\\n    new Dialog.Input(options, extraAttributes)\\n]" }));
    }

    fields.push(new Dialog.MultiLine({ id: "extraAttributes", label: "Extra Attributes (Object)" },
        { title: "Example:\\n{ style: \\"height: 200px\\" }" }));

    var buttons = [
        new Dialog.Button("Add", function (fieldResults) {
            addFieldTypeCallback(fieldResults, fieldType, fieldsValue, addFieldDialog, dialogContext);
        }, true, true),
        new Dialog.Button("Cancel")
    ];

    if (fieldType == "Group") {
        buttons.unshift(new Dialog.Button("Add Field", function (fieldResults) {
            addField(fieldResults, addFieldDialog, id + "-addField");
        }, false, true));
    }

    var addFieldDialog = new Dialog({
        id: id + "-addField",
        title: "Add " + fieldType,
        height: fieldType == "Lookup" ? 640 : 540,
        buttons: buttons,
        fields: fields,
    }).show();
}

function addFieldTypeCallback(results, fieldType, fieldsValue, addFieldDialog, dialogContext) {
    var data = results.getData();

    for (var prop in data) {
        if (data[prop] === null) { delete data[prop]; }
    }

    data.fieldType = fieldType;
    if (data.inline === true && fieldType != "Group") { data.inline = undefined; }
    if (data.inline === false && fieldType == "Group") { data.inline = undefined; }
    if (data.extraAttributes) { data.extraAttributes = eval("(" + data.extraAttributes + ")"); }
    if (data.entityTypes) { data.entityTypes = eval(data.entityTypes); }
    if (data.filters) { data.filters = eval(data.filters); }
    if (data.disableMru === false) { data.disableMru = undefined; }
    if (data.options) { data.options = eval(data.options); }
    if (data.fields) { data.fields = eval(data.fields); }
    data.value = mapValue(data.value, data.fieldType, data.type);

    fieldsValue.push(data);

    var fieldsText = mapFieldsText(fieldsValue);
    dialogContext.getElement("#fields textarea").value = fieldsText;

    addFieldDialog.close();
}

function mapValue(value, fieldType, inputType) {
    var returnValue = value;

    if (typeof value !== "undefined" && value !== "") {
        if (fieldType == "Lookup") {
            returnValue = eval(value);
        }
        if (fieldType == "Input" && (inputType == "checkbox" || inputType == "radio")) {
            if (value === "true") { returnValue = true; }
            if (value === "false") { returnValue = false; }
        }
        if (fieldType == "Input" && (inputType == "number" || inputType == "range") && !isNaN(value)) {
            returnValue = Number(value);
        }
    }

    return returnValue;
}

function mapFieldsText(fields, indent) {
    indent = indent || "";
    var fieldsText = fields.map(a => {
        var fieldType = a.fieldType;
        a.fieldType = undefined;
        if (typeof a.value === "undefined") { a.value = a.defaultValue; }
        if (a.value === "" || a.value === null) { a.value = undefined; }
        a.defaultValue = undefined;
        a.type = a.type || undefined;

        var fieldsTemp;
        var fieldsPlaceholder;
        if (a.fields) {
            fieldsTemp = mapFieldsText(a.fields, indent + "    ");
            fieldsPlaceholder = jsonStringify(a.fields);
        }

        var extraAttr = "";
        if (a.extraAttributes) {
            extraAttr = ", " + jsonStringify(a.extraAttributes);
        }
        a.extraAttributes = undefined;

        var options = jsonStringify(a);
        if (options == "{}") { options = ""; }
        if (options == "" && extraAttr != "") { options = "null"; }
        if (fieldsTemp) { options = options.replace(fieldsPlaceholder, fieldsTemp); }

        return indent + "    new Dialog." + fieldType + "(" + options + extraAttr + ")";
    });

    return "[\\n" + (fieldsText.join(",\\n") || "        ") + "\\n" + indent + "]";
}

function jsonStringify(obj, pretty) {
    var jsonString;

    if (pretty) {
        jsonString = JSON.stringify(obj, null, 4);
    }
    else {
        jsonString = JSON.stringify(obj, null, "\\n").replace(/\\n/g, " ").replace(/  +/g, " ");
    }

    jsonString = jsonString.replace(/"([^"]+)":/g, '$1:');

    return jsonString;
}`
    });

    examples.forEach(async (example) => {
        let element = document.createElement("div");
        element.classList.add("example-wrapper");

        element.innerHTML = `<div class="heading"><a id="${example.id}"></a>${example.blurb}</div><div class="example"><div><textarea spellcheck="false" id="code-${example.id}">${example.code}</textarea><div><button id="button-${example.id}" class="preview-button">Preview</button></div></div><div><img src="${example.imageUrl}"></div></div>`;
        document.getElementById("exampleWrapper").append(element);

        let tocElement = document.createElement("li");
        tocElement.innerHTML = `<a href="#${example.id}">${example.blurb}</a>`;
        document.getElementById("toc").append(tocElement);

        document.getElementById(`button-${example.id}`).addEventListener("click", async () => {
            try {
                eval("(async()=>{" + document.getElementById(`code-${example.id}`).value + "\n})();");
            }
            catch (e) {
                console.error(e);
                alert(e);
            }
        });
    });

    // Jump to anchor onload
    if (window.location.href.indexOf("#") > -1) { window.location.href = window.location.href; }

    // Set the version number
    document.getElementById("version").innerText = `(v${Dialog._version})`;
}
