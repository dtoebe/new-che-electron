/* jshint node: true */
/* jshint esversion: 6 */
/* jshint browser: true */

"use strict";

// Load electron messaging
var ipcRenderer = require("electron").ipcRenderer;
var webview = document.getElementById("webview");

// Set any new window link target to open default browser
// TODO create a setting to either open a new window or open default browser
// TODO create secondary window
// TODO create way to have persistent data: sqlight?
webview.addEventListener("new-window", (event) => {
    require("electron").shell.openExternal(event.url);
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
