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
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const ipcMain = electron.ipcMain;

let mainWin = null;
let secondaryWin = null;

//Controller for starting and controlling the main view
function createWindow() {
    mainWin = new BrowserWindow({
        width: 1024,
        height: 768,
        frame: true
        // "node-integration": false
    });

    //TODO creat the possibility to use input cli args as url, like in original app
    mainWin.loadURL("file://" + __dirname + "/windows/main-win/main-win.html");

    // mainWin.webContents.openDevTools();

    // Load menubar template
    const template = require("./menubar.js")(mainWin, ipcMain);
    const mainMenu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(mainMenu);


    // Clean win var if closed
    mainWin.on("closed", () => {
        mainWin = null;
    });

    secondaryWin = new BrowserWindow({
        width: 1024,
        height: 600,
        frame: true,
        show: false
    });

    secondaryWin.on("closed", () => {
        secondaryWin = null;
        //TODO add focus to mainWin;

    });
}

//when the main-win sends a new win msg: shows second window
//TODO create secondwin when needed. do not load in bg
ipcMain.on("new-win", (event, msg) => {
    secondaryWin.show(true);
    console.log(msg);
    secondaryWin.loadURL("file://" + __dirname + "/windows/secondary-win/secondary-win.html");

    //When second window is done loading send message
    secondaryWin.webContents.on("did-finish-load", () => {
        secondaryWin.webContents.send("1234", msg);
    });
});


app.on("ready", createWindow);

app.on("window-all-closed", () => {
    // Make sure to not completely close if OSX
    if(process.platform !== "darwin") {
        app.quit();
    }
});

//Start the main view
app.on("active", () => {
    if (mainWin === null) {
        createWindow();
    }
});
