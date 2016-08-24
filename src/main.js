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


"use-strict";

const electron = require("electron");
const app = electron.app;
const Menu = electron.Menu;
// const ipcMain = electron.ipcMain;
const window = require("./windows.js");
const exec = require("child_process").exec;

let Windows = new window(electron);
let channel = "";

const ipc = require("./ipc.js")(electron, Windows);

//TODO create secondwin when needed. do not load in bg
// ipcMain.on("new-win", (event, msg) => {
//     secondaryWin.show(true);
//     console.log(msg);
//     secondaryWin.loadURL("file://" + __dirname + "/windows/secondary-win/secondary-win.html");

//     //When second window is done loading send message
//     secondaryWin.webContents.on("did-finish-load", () => {
//         secondaryWin.webContents.send("1234", msg);
//     });
// });

// ipcMain.on("url-data", (event, msg) => {
//     Windows.mainWindow.loadURL("file://" + __dirname + "/windows/main-win/main-win.html");

//     Windows.mainWindow.webContents.on("did-finish-load", () => {
//         Windows.mainWindow.webContents.send("load-data", msg);
//     });
// }); 


app.on("ready", () => {
    Windows.serverLoginScreen();
});

app.on("window-all-closed", () => {
    // Make sure to not completely close if OSX
    const localDockerCMD = "docker run --rm -t -v /var/run/docker.sock:/var/run/docker.sock -e CHE_HOST=172.17.0.1 eclipse/che";
    if(process.platform !== "darwin") {
        exec(localDockerCMD + " stop", (error, stdout, stderr) => {
            console.log("stdout: " + stdout);
            console.log("stderr: " + stderr);

            if (error !== null) {
                console.log("exec error: " + error);
            }
            // Emit needed signals to main-win.html
            //TODO Pipe stdout/stderr to main-win.html

            Windows.mainWindow.webContents.send("ide-send", msg);
        });
        app.quit();
    }
});

//Start the main view
app.on("active", () => {
    if (Windows.mainWindow === null) {
        Windows.serverLoginScreen();
    }
});
