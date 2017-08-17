# Alert.js - CRM 2013-D365 Custom Alerts and Popup Dialogs JavaScript Lightbox
[![download](https://user-images.githubusercontent.com/14048382/27844360-c7ea9670-6174-11e7-8658-80d356c1ba8f.png)](https://github.com/PaulNieuwelaar/alertjs/blob/master/AlertJS_2_1_0_0_managed.zip) (v2.1) [<img align="right" src="https://user-images.githubusercontent.com/14048382/29433676-4eb13ea6-83f4-11e7-8c07-eca514b1b197.png"/>](https://github.com/PaulNieuwelaar/alertjs/wiki/Documentation)

![home_sale](https://user-images.githubusercontent.com/14048382/27886544-a4e8af74-6230-11e7-85e5-e8ad3a08cbb4.PNG)

## Overview

This JavaScript library allows us to create custom popup alerts in CRM forms and views, using a nice lightbox with custom buttons and messages.

CRM 2013 introduced light-boxes for most popups to make the UI look cleaner with less browser alerts and popups. However, these internal functions were not included in the SDK, so as developers we couldn't access them for our custom code. Instead, we've been forced to use alertDialog and confirmDialog which under the hood just calls the browsers alert and confirm functions. The main problems with this is that we cannot customize the buttons, and the alerts look ugly.

Using this library we can now create our own seamless alerts and popups using custom buttons and custom callback functions for each button. We can also specify different types of icons to display in the alerts, instead of being forced to use the alert 'exclamation mark' or confirm 'question mark'.

While technically unsupported, this code is 100% contained within the solution, and doesn't depend on anything CRM related, so it's unlikely this will break with CRM updates.

As of version 2.1, you can also display custom HTML web resources, iFrames, and dialog processes inside the light-box seemlessly.

![home_alertjs2](https://user-images.githubusercontent.com/14048382/27886545-a50497a2-6230-11e7-9d08-6b4d5c9ce764.PNG)

## How it Works

Check out the [Documentation](https://alertjs.codeplex.com/documentation) page for installation and usage details.

Download and install the unmanaged solution, then simply add a reference to mag_/js/alert.js wherever you want to use the custom alerts. This will work from forms, views, command bars, and pretty much anywhere in CRM that supports JavaScript.

Next simply call the Alert.show function. All other dependent web resources will be loaded automatically.

Parameters: Title (main message), Subtitle (smaller message), Buttons (array), Icon, Width (px), Height (px), CRM Base URL, Prevent Cancel (bool), Padding (px).

All the parameters are _technically_ optional. If no buttons are specified, a default 'OK' button with no callback will be added. If no icon is specified, then no icon will be displayed. If height is not specified, it will default to 250. If width is not specified it will default to 500. The URL only needs to be specified if the alert is being called from somewhere that doesn't have Xrm.Page access (e.g. web resource). To hide the 'X' on the alert, set preventCancel to true, otherwise it displays the 'X' by default. If padding is not specified, it will default to 20px.

Each button object in the buttons array needs to have a 'label' (text displayed on the button), and optionally a 'callback' (function called if the button is clicked). You can also specify whether focus should be set to the button by default, and whether clicking the button should close the alert by default. You can use: new Alert.Button(label, callback, setFocus, preventClose); to create each button. 

The following icons are supported: "INFO", "WARNING", "ERROR", "SUCCESS", "QUESTION", "LOADING".

```javascript
Alert.show("Would you like to create a sale?", "This will create and open the new sale record.", [
    new Alert.Button("Create Sale", function() {
        Alert.show("Sale created successfully!", null, null, "SUCCESS", 500, 200);
    }, true, true),
    new Alert.Button("Not now")
], "QUESTION", 500, 200);
```

![home_sale2](https://user-images.githubusercontent.com/14048382/27886546-a507bcde-6230-11e7-8981-fd58adb715d0.PNG)

Created by [Paul Nieuwelaar](http://paulnieuwelaar.wordpress.com) - [@paulnz1](https://twitter.com/paulnz1)  
Sponsored by [Magnetism Solutions - Dynamics CRM Specialists](http://www.magnetismsolutions.com)
