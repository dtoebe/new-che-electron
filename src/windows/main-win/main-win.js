/* jshint node: true */
/* jshint esversion: 6 */
/* jshint browser: true */

/*
 * Copyright (c) 2016 Daniel Toebe
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 *
 * Contributors:
 *     Daniel Toebe
 */


"use strict";

// Load electron messaging
let ipcRenderer = require("electron").ipcRenderer;
let webview = document.getElementById("webview");
let reloadCount = 0;

// TODO create a setting to either open a new window or open default browser
// TODO create secondary window
// TODO create way to have persistent data: sqlight?

/******** WebView Event Listeners ***********/

// Set any new window link target to open default browser
webview.addEventListener("new-window", (event) => {
    // require("electron").shell.openExternal(event.url);
    ipcRenderer.send("new-win", event.url);
});

//Listen for failed load. i.e. server not started.
webview.addEventListener("did-fail-load", (event) => {
    //Chech how many times the webview is unable to load IDE
    if(reloadCount < 1) {
        let msg = JSON.stringify({url: webview.src});
        ipcRenderer.send("ide-fail-load", msg);
        reloadCount++;
    } else {
        //TODO create popup the server is unreachable
    }
});

/*********** IPC Listeners **************/

ipcRenderer.on("start-server", (event, msg) => {
    let msgObj = JSON.parse(msg);
    setView(msgObj.url, "inline-flex");
});

// Listen for load-data JSON
ipcRenderer.on("ide-send", (event, msg) => {
    //convert to object
    let msgObj = JSON.parse(msg);

    // Test if there is a URL, if not clear webview src and no display
    if (msgObj.url.length !== 0) {
        setView(msgObj.url, "inline-flex");
    } else {
        setView("", "none");
    }
});


/*********** Utility Functions ****************/

// Simple helper function to set the webview src and display
function setView(src, display) {
    webview.src = src;
    webview.style.display = display;
}
