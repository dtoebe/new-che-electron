/* jshint node: true */
/* jshint esversion: 6 */

"use-strict";

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const ipcMain = electron.ipcMain;

let win = null;

//Controller for starting and controlling the main view
function createWindow() {
    win = new BrowserWindow({
        width: 1024,
        height: 768,
        frame: true
        // "node-integration": false
    });

    //TODO creat the possibility to use input cli args as url, like in original app
    win.loadURL("file://" + __dirname + "/html/main-win.html");

    // win.webContents.openDevTools();

    // Load menubar template
    const template = require("./menubar.js")(win, ipcMain);
    const mainMenu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(mainMenu);


    // Clean win var if closed
    win.on("closed", () => {
        win = null;
    });
}



app.on("ready", createWindow);

app.on("window-all-closed", () => {
    // Make sure to not completely close if OSX
    if(process.platform !== "darwin") {
        app.quit();
    }
});

//Start the main view
app.on("active", () => {
    if (win === null) {
        createWindow();
    }
});
