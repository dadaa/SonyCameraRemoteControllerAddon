/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this file,
* You can obtain one at http://mozilla.org/MPL/2.0/. */

const { Cc, Ci } = require("chrome")
const wm = Cc["@mozilla.org/appshell/window-mediator;1"].getService(Ci.nsIWindowMediator);
const mainWindow = wm.getMostRecentWindow("navigator:browser");
const sonycameracontroller = require("SonyCameraController.js");

mainWindow.gBrowser.addEventListener("readystatechange", function(e) {
  let doc = e.originalTarget;
  if (doc.defaultView.frameElement) {
    return;
  }
  if (doc.readyState != "interactive") {
    return;
  }
  doc.wrappedJSObject.sonycameracontroller = sonycameracontroller; 
}, true);