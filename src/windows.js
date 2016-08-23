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

//predefined globals
let mainWindow = null; //Login screen / IDE screen
let secondaryWindows = []; //Array for any secondary windows

//Export structure
module.exports = {
    mainWindow: mainWindow,
    serverLoginScreen: serverLoginScreen,
    ideScreen: ideScreen,
    secondaryWindows: secondaryWindows,
    secondaryWindowCreator: secondaryWindowCreator
};

//Init screen: to choose different options to load Che server
function serverLoginScreen(BrowserWindow) {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        frame: true
    });

    mainWindow.loadURL(
        "file://" + __dirname + "/windows/server-login/server-login.html");

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

//Switches login screen to ide screen once server has been chosen
function ideScreen(url) {
    mainWindow.loadURL("file://" + __dirname + "/windows/ide-win/ide-win.html");

    mainWindow.webContents.on("did-finish-load", () => {
        mainWindow.webContents.send("load-ide", url);
    });
}


//Will load additional windows, such as noVNC
function secondaryWindowCreator() {

}
