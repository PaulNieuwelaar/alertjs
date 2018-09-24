# Alert.js - Microsoft Dynamics 365 Custom JavaScript Alerts, Popups, and Prompts
[![download](https://user-images.githubusercontent.com/14048382/27844360-c7ea9670-6174-11e7-8658-80d356c1ba8f.png)](https://github.com/PaulNieuwelaar/alertjs/releases/download/v3.0/AlertJS_3_0_5_managed.zip) (v3.0 managed) [<img align="right" src="https://user-images.githubusercontent.com/14048382/29433676-4eb13ea6-83f4-11e7-8c07-eca514b1b197.png"/>](https://github.com/PaulNieuwelaar/alertjs/wiki/Documentation-v3.0)

Alert.js v3.0 (including showPrompt) is now available. Please review the [licensing info](#licensing) below before downloading.

![](https://user-images.githubusercontent.com/14048382/40751240-74f24b68-64be-11e8-8c2f-1d6bae31428f.png)

## Key Features

* Show confirmation messages to users
* Capture input from users and process their responses
* Display informative error messages
* Fully customizable buttons and callback functions
* Open custom HTML web resources inside a lightbox
* Access web resource data from button callbacks
* Show CRM dialog processes with custom callbacks
* Display a loading spinner during async tasks

## Overview

This JavaScript library allows us to create custom popup alerts in CRM forms and views, using a nice lightbox with custom buttons and messages.

CRM 2013 introduced light-boxes for most popups to make the UI look cleaner with less browser alerts and popups. However, these internal functions were not included in the SDK, so as developers we couldn't access them for our custom code. Instead, we've been forced to use alertDialog and confirmDialog which under the hood just calls the browsers alert and confirm functions. The main problems with this is that we cannot customize the buttons, and the alerts look ugly.

Using this library we can now create our own seamless alerts and popups using custom buttons and custom callback functions for each button. We can also specify different types of icons to display in the alerts, instead of being forced to use the alert 'exclamation mark' or confirm 'question mark'.

While technically unsupported, this code is 100% contained within the solution, and doesn't depend on anything CRM related, so it's unlikely this will break with CRM updates.

As of version 3.0, you can also display custom prompts to capture input from a user, and take their responses to perform other tasks.

![](https://user-images.githubusercontent.com/14048382/38449753-a6656062-3a67-11e8-91c0-3dfb4bfe69d6.PNG)

## How it Works
Check out the [Documentation](https://github.com/PaulNieuwelaar/alertjs/wiki/Documentation) page for installation and usage details.

## Licensing

### Alert.js v3.0
Alert.js v3.0 is free for non-production use. This means you can use it for free in DEV and TEST systems only, or in production as a 30 day trial. The v3.0 code is NOT open source, meaning you cannot modify it. By downloading v3.0 you agree to the [v3.0 terms of use](https://github.com/PaulNieuwelaar/alertjs/blob/master/license.md). Download and install the v3.0 solution, then [purchase a production license](https://www.magnetismsolutions.com/buy-now?product=alertjs) when you're ready to activate your organisation.
For more information about what's available in v3.0, check out the "what's new in v3.0" section below, or check out the [v3.0 Documentation](https://github.com/PaulNieuwelaar/alertjs/wiki/Documentation-v3.0).

### Alert.js v2.1
Alert.js v2.1 is and always will be available for free here on Github under other releases. This version will continue to receive updates in the form of bug fixes only, and does not include any of the new features introduced in v3.0 or any versions going forward. For more info about the v2.1 license details, check out the [license page](https://github.com/PaulNieuwelaar/alertjs/blob/master/license-v2.1.md) in this project.

## What's new in v3.0?
* Added a new Alert.showPrompt function for easily capturing input of different types (see documentation for more detail)
* Added a new Alert.getPromptResponses function for accessing field values from a prompt
* Added support for nested/overlapping alerts with a new 'id' parameter on all functions (will overwrite existing alerts with the same id)
* Updated styles to reflect v9.0 colours
* Added new object constructor, which can be used alongside the new function constructors:
   * e.g. new Alert({ title: "Hello World", message: "Hello", width: 500, height: 300 }).show();
* Added new function constructors to call all existing functions, 
   * e.g. new Alert().title("Hello World").message("Hello").width(500).height(300).show();
   * Existing function calls still work using Alert.show() etc. however these will be deprecated in the future
* Added the iFrame window context as the first and only parameter of the alert button callbacks when using Alert.showIFrame and Alert.showWebResource, 
   * e.g. new Button("Close", function(iframeWindow) { alert(iframeWindow.document.getElementById("textbox").value); });
* Added the prompt responses as the first and only parameter of the alert button callbacks when using Alert.showPrompt, 
   * e.g. new Button("Update", function(responses) { Xrm.Page.getAttribute("name").setValue(responses[0].value); });
* Updated showLoading function to include customizable options for things like title, message, icon, height, width
* Added a fullscreen property
* showIFrame now supports iframeContent as a second parameter to pass custom HTML in Chrome
* Added allowDismiss to all alert types, allowing the user to click outside the alert to close it
* Added a new .remove() function to completely delete the alert, rather than just hiding it
* Deprecated baseUrl parameter - when being used outside of CRM forms/views the CSS should be loaded onto the page manually
* Updated the Alert.show function to accept jQuery objects into the content parameter (previously called message)
* Added an additional message parameter to go above the content (for showing a message with an iframe/prompt etc)
* Added a new SEARCH icon type
* Added official support for Alert.$ to access alert dialogs using jquery
* Added a .get() function to return the jquery object for the alert

Created by [Paul Nieuwelaar](http://paulnieuwelaar.wordpress.com) - [@paulnz1](https://twitter.com/paulnz1)  
Sponsored by [Magnetism Solutions - Dynamics CRM Specialists](http://www.magnetismsolutions.com)
