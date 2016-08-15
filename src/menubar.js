/* jshint node: true */
/* jshint esversion: 6 */

/*
 This defines the template for the native menu bar in the electron app
 */


const exec = require("child_process").exec;

// Default docker run command from https://eclipse-che.readme.io/docs/usage-docker#usage
const localDockerCMD = "docker run --rm -t -v /var/run/docker.sock:/var/run/docker.sock -e CHE_HOST=172.17.0.1 eclipse/che";

// Runs the che docker command then emits a msg to the main-win.html
function serverCMD(item, focusedWindow, command, win) {
    //Run the docker cmd and output to stdout/stderr
    exec(localDockerCMD + " " + command, function(error, stdout, stderr) {
        console.log("stdout: " + stdout);
        console.log("stderr: " + stderr);

        if(error !== null) {
            console.log("exec error: " + error);
        }

        // Emit needed signals to main-win.html
        //TODO Pipe stdout/stderr to main-win.html
        if(command === "start") {
            win.webContents.send("http://localhost:8080");
        } else if(command == "stop") {
            win.webContents.send("close");
        }
    });
}

// Export: main template for native menu bar
//Takes: win: electron.BrowserWindow; ipc: electron.ipcMain
module.exports = (win, ipc) => {
    return [{
        label: "Server",
        submenu: [{
            label: "Start Local",
            accelerator: "CmdOrCtrl+S",
            click(item, focusedWindow) {
                serverCMD(item, focusedWindow, "start", win);
            }
        }, {
            label: "Stop Local",
            accelerator: "Shift+CmdOrCtrl+S",
            click(item, focusedWindow) {
                serverCMD(item, focusedWindow, "stop", win);
            }
        }, {
            label: "Update Local",
            accelerator: "CmdOrCtrl+U",
            click(item, focusWindow) {
                serverCMD(item, focusWindow, "update", win);
            }
        }]
    }, {
        label: "View",
        submenu: [{
            label: "Toggle Menu Bar",
            accelerator: "F2",
            click(item, focusedWindow) {
                if (focusedWindow) {
                    win.setMenuBarVisibility(!win.isMenuBarVisible());
                }
            }
        }, {
            label: "Toggle Full Screen",
            accelerator: process.platform === "darwin" ? "Ctrl+Command+F" : "F11",
            click(item, focusedWindow) {
                if (focusedWindow) {
                    focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
                }
            }
        }, {
            type: "separator"
        }, {
            label: "Toggle Dev Tools",
            accelerator: process.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
            click(item, focusedWindow) {
                if (focusedWindow) {
                    focusedWindow.webContents.toggleDevTools();
                }
            }
        }]
    }];
}
