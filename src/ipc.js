/* jshint node: true */
/* jshint esversion: 6 */

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

/*

 INCOMING:
     "ide-load": {"url": "ulr/to/ide"}
     "ide-fail-load": {"url": "/url/to/ide"}


 OUTGOING:
     "ide-send": {"url": "url/to/ide"}

 */


"use-strict";


module.exports = (electron, Windows) => {
    const exec = require("child_process").exec;
    const ipc = electron.ipcMain;
    const windowDir = "file://" + __dirname + "/windows";
    const localDockerCMD = "docker run --rm -t -v /var/run/docker.sock:/var/run/docker.sock -e CHE_HOST=172.17.0.1 eclipse/che";

    ipc.on("ide-load", (event, msg) => {
        console.log("hello");
        Windows.mainWindow.loadURL(windowDir + "/main-win/main-win.html");

        Windows.mainWindow.webContents.on("did-finish-load", () => {
            Windows.mainWindow.webContents.send("ide-send", msg);
        });
    });

    ipc.on("ide-fail-load", (event, msg) => {
        console.log("ide-fail-load");
        exec(localDockerCMD + " start", (error, stdout, stderr) => {
            console.log("stdout: " + stdout);
            console.log("stderr: " + stderr);

            if (error !== null) {
                console.log("exec error: " + error);
            }
            // Emit needed signals to main-win.html
            //TODO Pipe stdout/stderr to main-win.html

            Windows.mainWindow.webContents.send("ide-send", msg);
        });
    });
};
