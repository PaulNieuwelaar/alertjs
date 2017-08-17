## v2.1
Includes some new features:
* New methods for showing web resources, dialog processes, and custom iframes
* Better support for working with iframes, like easily accessing the CRM form from the iframe, and easily accessing the iframe from the CRM form
* New way of specifying custom padding on the alerts, to allow for 0 padding on iframes etc
* Fixed layout and sizing issues when displaying messages with no title, or no buttons etc
* Documentation for new methods

## v2.0
Version 2.0 makes the solution more supported, by creating our own lightbox instead of hi-jacking CRM's lightbox. This means the lightboxes work in outlook and all major browsers as well.

Since it's no longer depending on CRM components, it's more likely this solution will work with future releases.

New features include:
* Backwards compatibility for v1.0, meaning you can upgrade to v2.0 without making any changes to existing code.
* Uses custom lightbox instead of CRM lightbox, so no more slow HTML web resource loading, and no more modal dialogs in outlook, just 100% lightbox everywhere! Even on the tablet client!
* New "LOADING" icon available.
* New constructor for creating buttons: new Alert.Button(label, callback, setFocus, preventClose).
* Ability to set focus to a particular button by default, or for single button alerts focus will automatically be set to the only button (unless explicitly set to false).
* Ability to keep the alert open after clicking a certain button (for download log type functionality).
* Ability to display trace logs etc by encoding the messages using the Alert.htmlEncode(text) function.
* Displays larger messages nicely with a vertical scroll bar.
* Ability to hide the 'X' button on the alert, to force users to select one of the available buttons.
* Added functionality to hide the buttons bar if no buttons are specified (by passing in an empty array).
* Added a new function to allow developers to close the alert using code: Alert.hide(). This can be used to close the alert after a background process completes, for example to close a "loading" alert.
* Added better error handling if callback functions crash.
* Added functionality to 'top align' the message and icon if the alert height is greater than 250, to make displaying larger errors such as trace logs nicer.
* Moved the solution prefix into a global variable which can be updated more easily if you want to maintain your own publisher prefixes on the web resources.
* Changed the default height and width variables, just because I can.
* One important change is that displaying multiple alerts at once is no longer supported, and so calling Alert.show() multiple times will now overwrite the previous alert instead of stacking them.
* Added a new function called Alert.showLoading() which is simply a wrapper for calling the Alert.show() with some default values to display a nice "Loading..." message for locking the UI if you're doing some important async tasks etc.
