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

// Set any new window link target to open default browser
// TODO create a setting to either open a new window or open default browser
// TODO create secondary window
// TODO create way to have persistent data: sqlight?
webview.addEventListener("new-window", (event) => {
    // require("electron").shell.openExternal(event.url);
    ipcRenderer.send("new-win", event.url);
});

// Listen for load-data JSON
ipcRenderer.on("load-data", (event, msg) => {
    //convert to object
    let msgObj = JSON.parse(msg);
    // console.log(msgObj);

    // Simple helper function to set the webview src and display
    let setView = (src, display) => {
        webview.src = src;
        webview.style.display = display;
    };

    // console.log(msgObj.url.length);

    // Test if there is a URL, if not clear webview src and no display
    if (msgObj.url.length !== 0) {
        setView(msgObj.url, "inline-flex");
    } else {
        setView("", "none");
    }
});
