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

class Window {

    constructor(electron) {
        this.mainWindow = null;
        this.secondaryWindows = [];
        this.BrowserWindow = electron.BrowserWindow;
    }

    //Init screen: to choose different options to load Che server
    serverLoginScreen() {
        this.mainWindow = new this.BrowserWindow({
            width: 1024,
            height: 768,
            frame: true
        });

        this.mainWindow.loadURL(
            "file://" + __dirname + "/windows/server-login/server-login.html");

        this.mainWindow.on("closed", () => {
            this.mainWindow = null;
        });
    }

    //Switches login screen to ide screen once server has been chosen
    ideScreen(url) {
        this.mainWindow.loadURL("file://" + __dirname + "/windows/ide-win/ide-win.html");

        this.mainWindow.webContents.on("did-finish-load", () => {
            this.mainWindow.webContents.send("load-ide", url);
        });
    }


    //Will load additional windows, such as noVNC
    secondaryWindowCreator() {

    }
}

module.exports = Window;
