# Dialog Builder (Alert.js) - Microsoft Dynamics 365 Custom JavaScript Alerts, Popups, and Prompts
[![download](https://user-images.githubusercontent.com/14048382/27844360-c7ea9670-6174-11e7-8658-80d356c1ba8f.png)](https://github.com/PaulNieuwelaar/alertjs/releases/download/v3.1/AlertJS_3_1_0_managed.zip) (v3.1 managed) [<img align="right" src="https://user-images.githubusercontent.com/14048382/29433676-4eb13ea6-83f4-11e7-8c07-eca514b1b197.png"/>](https://github.com/PaulNieuwelaar/alertjs/wiki/Documentation-v3.0)

Please review the [licensing info](#licensing) below before downloading.

![](https://user-images.githubusercontent.com/14048382/86217559-c1139100-bbd3-11ea-9dd1-edf455430eac.png)

## Key Features

* Create user driven dialog processes
* Recreate Dynamics 365 functionality like Resolve Case, or Qualify Lead
* Show stylish confirmation messages to users
* Capture simple or complex input from users and process their responses
* Display informative messages to users, including errors and warnings
* Fully customisable buttons and callback functions
* Display custom web resources as an inline popup
* Fully customisable UI allowing you to create unique dialogs to suit your needs
* Open custom HTML web resources inside a lightbox
* Display a loading spinner during async tasks

## Overview

Dialog Builder for Dynamics 365 allows you to create fully customisable dialogs and popups in Dynamics 365, using custom fields, buttons, messages, and icons. Capture input from users with a variety of different field types, displayed in a seamless Dynamics 365 style popup.

Dialog Builder gives you the power to extend Dynamics 365 with a seamless user experience when building end to end processes for your users.

![](https://user-images.githubusercontent.com/14048382/86217379-827dd680-bbd3-11ea-9b30-2f3a2262c619.png)

## How it Works
Check out the [Documentation](https://github.com/PaulNieuwelaar/alertjs/wiki/Documentation-v3.0) page for installation and usage details.

## Licensing

### Dialog Builder v3
Dialog Builder (previously Alert.js v3.0) is free for non-production use. This means you can use it for free in DEV and TEST systems only, or in production as a 30 day trial. The version 3 code is NOT open source, meaning you cannot modify it. By downloading version 3 you agree to the [v3 terms of use](https://github.com/PaulNieuwelaar/alertjs/blob/master/license.md). Download and install the v3 solution, then [purchase a production license](https://www.magnetismsolutions.com/our-products/alertjs-alert-popup-for-d365) when you're ready to activate your organisation.
For more information about what's available in v3, check out the "what's new in v3.0" section below, or check out the [v3.0 Documentation](https://github.com/PaulNieuwelaar/alertjs/wiki/Documentation-v3.0).

### Alert.js v2.1
Alert.js v2.1 is and always will be available for free here on Github under other releases. This version will continue to receive updates in the form of bug fixes only, and does not include any of the new features introduced in v3.0 or any versions going forward. For more info about the v2.1 license details, check out the [v2.1 license](https://github.com/PaulNieuwelaar/alertjs/blob/master/license-v2.1.md) in this project.

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
