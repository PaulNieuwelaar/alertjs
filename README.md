# Alert.js - CRM 2013-Dynamics 365 Custom Alerts and Popup Dialogs JavaScript Lightbox
[![download](https://user-images.githubusercontent.com/14048382/27844360-c7ea9670-6174-11e7-8658-80d356c1ba8f.png)](https://github.com/PaulNieuwelaar/alertjs/releases/download/v2.1/AlertJS_2_1_0_0_managed.zip) (v2.1 managed) [<img align="right" src="https://user-images.githubusercontent.com/14048382/29433676-4eb13ea6-83f4-11e7-8c07-eca514b1b197.png"/>](https://github.com/PaulNieuwelaar/alertjs/wiki/Documentation)

Alert.js v3.0 (including showPrompt) is now available. Please review the [licensing info](#licensing) below.

![](https://user-images.githubusercontent.com/14048382/38449752-a634bbce-3a67-11e8-8d1c-570ef763a162.PNG)

## Key Features

* Show confirmation messages to users
* Capture input from users and process their responses
* Display informative error messages
* Fully customizable buttons and callback functions
* Open custom HTML web resources inside a lightbox
* Access web resource data from button callbacks
* Capture input from a user and process their response
* Show CRM dialog processes with custom callbacks
* Display a loading spinner during async tasks
* 100% customizable and configurable

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

### Alert.js v2.1
Alert.js v2.1 is and always will be available for free here on Github, and on [Microsoft AppSource](https://appsource.microsoft.com/en-us/product/dynamics-365/magnetism.alertjs). This version will continue to receive updates in the form of bug fixes only. For more info about the license details, check out the [license page](https://github.com/PaulNieuwelaar/alertjs/blob/master/license.md) in this project.

### Alert.js v3.0
Alert.js v3.0 is free for non-production use. This means you can use it for free in DEV and TEST systems only. The solution is currently available by contact request only. The v3.0 code is NOT open source, meaning you cannot modify it. [Contact us](https://www.magnetismsolutions.com/contact-us) for a free trial, or to purchase a production license.
For more information about what's available in v3.0, check out the [v3.0 Documentation](https://github.com/PaulNieuwelaar/alertjs/wiki/Documentation-v3.0).


Created by [Paul Nieuwelaar](http://paulnieuwelaar.wordpress.com) - [@paulnz1](https://twitter.com/paulnz1)  
Sponsored by [Magnetism Solutions - Dynamics CRM Specialists](http://www.magnetismsolutions.com)
