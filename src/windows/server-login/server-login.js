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

let btnLocalDefault = document.getElementById("btn-local-default");
let ipcRenderer = require("electron").ipcRenderer;

btnLocalDefault.addEventListener("click", (event) => {
    ipcRenderer.send("ide-load", "{\"url\": \"http://localhost:8080\"}");
});
