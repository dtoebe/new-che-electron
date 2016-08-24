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
const Windows = require("./windows.js");

<<<<<<< HEAD

=======
<<<<<<< HEAD
let mainWin = null;
let secondaryWin = [];
let secondaryObj = {};

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
=======
let Windows = new window(electron);
let channel = "";

const ipc = require("./ipc.js")(electron, Windows);
>>>>>>> login-page
>>>>>>> 705a39ddfbb9673e1fe5e29e12a47338c5e81f1d

//DEPRECATED: all logic in createWindow is now going to be found
// in windows.js module
//Leaving here for reference until windows.js module is done
//Controller for starting and controlling the main view
function createWindow() {
    mainWin = new BrowserWindow({
        width: 1024,
        height: 768,
        frame: true
        // "node-integration": false
    });

    //TODO creat the possibility to use input cli args as url, like in original app
    mainWin.loadURL("file://" + __dirname + "/windows/server-login/server-login.html");

    // mainWin.webContents.openDevTools();

    // Load menubar template
    const template = require("./menubar.js")(mainWin, ipcMain);
    const mainMenu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(mainMenu);


    // Clean win var if closed
    mainWin.on("closed", () => {
        mainWin = null;
    });

<<<<<<< HEAD
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
=======
<<<<<<< HEAD
    // Clean win var if closed
    mainWin.on("closed", () => {
        mainWin = null;
    });
}


// this function creates a new secondary window
// adds it to an array
// and can be removed from array
// TODO getting strange new IDE window. Need to investigate.
function createSecondaryWin(url) {

    secondaryObj = {
        window: new BrowserWindow({
            width: 1040,
            height: 768,
            frame: true,
            show: true
        }),
        url: url,
        id: "1234"
    };

    secondaryWin.push(secondaryObj);
    let count = secondaryWin.length - 1;
    secondaryWin[count].window
        .loadURL("file://" + __dirname + "/windows/secondary-win/secondary-win.html?" +
            secondaryWin[count].id);
    secondaryWin[count].window.on("closed", () => {
        secondaryWin[count].window = null;
        secondaryWin.pop(count);
        //TODO add focus to mainWin;
    });

    secondaryWin[count].window.webContents.on("did-finish-load", () => {
        secondaryWin[count].window.webContents.send(secondaryWin[count].id, url);
    });
}


//when the main-win sends a new win msg: shows second window
ipcMain.on("new-win", (event, msg) => {

    console.log(msg);

    //When second window is done loading send message
    createSecondaryWin(msg);
=======
//     //When second window is done loading send message
//     secondaryWin.webContents.on("did-finish-load", () => {
//         secondaryWin.webContents.send("1234", msg);
//     });
// });
>>>>>>> 705a39ddfbb9673e1fe5e29e12a47338c5e81f1d

ipcMain.on("url-data", (event, msg) => {
    mainWin.loadURL("file://" + __dirname + "/windows/main-win/main-win.html");

    mainWin.webContents.on("did-finish-load", () => {
        mainWin.webContents.send("load-data", msg);
    });
}); 


app.on("ready", () => {
<<<<<<< HEAD
    Windows.serverLoginScreen(BrowserWindow);
=======
    Windows.serverLoginScreen();
>>>>>>> login-page
>>>>>>> 705a39ddfbb9673e1fe5e29e12a47338c5e81f1d
});

app.on("window-all-closed", () => {
    // Make sure to not completely close if OSX
<<<<<<< HEAD
    if(process.platform !== "darwin") {
=======
<<<<<<< HEAD
    if (process.platform !== "darwin") {
=======
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
>>>>>>> login-page
>>>>>>> 705a39ddfbb9673e1fe5e29e12a47338c5e81f1d
        app.quit();
    }
});

//Start the main view
app.on("active", () => {
    if (mainWin === null) {
        createWindow();
    }
});
