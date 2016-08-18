// Load electron meesaging
var ipcRenderer = require("electron").ipcRenderer;
var webview = document.getElementById("webview");

webview.addEventListener("did-stop-loading", function(event) {
    console.log("done loading");
    console.log(webview.isLoading());
});

// webview.addEventListener = function(type, listener) {
//     console.log(type);
//     console.log(listener);
// };
// If Start Local menu item used load default local docker page
ipcRenderer.on("http://localhost:8080", function(data) {
    console.log(data);
    webview.src = "http://localhost:8080";
    webview.style.display = "inline-flex";
});

// If Stop Local menu item used clear out webview src and hide
// TODO create default view with proper branding so its not a white screen
ipcRenderer.on("close", function(data) {
    console.log(data);
    webview.src = "";
    webview.style.display = "none";
});
