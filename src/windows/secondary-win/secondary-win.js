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

let ipcRenderer = require("electron").ipcRenderer;
let webview = document.getElementById("webview");

//receive message to load url
ipcRenderer.on("1234", (event, msg) => {
    console.log("Hello");
    webview.src = msg;
    console.log(msg);
    webview.style.display = "inline-flex";
}); 
