/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

const {XMLHttpRequest} = require("sdk/net/xhr");
let config;

function execute(method, id, listener) {
  let command = {
    method: method, 
    params: [], 
    id: id,
    version: config.version
  } 
  let jsonString = JSON.stringify(command);
  let request = new XMLHttpRequest();
  request.onload = function (e) {
    if (listener) {
      let response = JSON.parse(request.responseText);
      let url = response.result[0][0];
      listener.taken(url);
    }
  };
  let url = "http://"+config.ipaddress+":"+config.port+"/sony/camera";
  request.open("POST", url, true);
  request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  request.send(jsonString);   
}

exports.setup = function(c) {
  config = c;
  execute("startRecMode", 1);
}

exports.take = function(listener) {
  execute("actTakePicture", 2, listener);
}

exports.__exposedProps__ = {
  setup: "r",
  take: "r"
}