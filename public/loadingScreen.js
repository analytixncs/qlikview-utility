const electron = require("electron");
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
/// create a global var, wich will keep a reference to out loadingScreen window
let loadingScreen;
const createLoadingScreen = () => {
  /// create a browser window
  loadingScreen = new BrowserWindow({
    /// define width and height for the window
    width: 400,
    height: 400,
    /// remove the window frame, so it will become a frameless window
    frame: false,
    /// and set the transparency, to remove any window background color
    transparent: true,
    webPreferences: {
      nodeIntegration: true, // needed if going to access file system
      backgroundThrottling: false
    },
    alwaysOnTop: true
  });
  loadingScreen.setResizable(false);
  loadingScreen.loadURL(
    isDev
      ? "http://localhost:3000/loading.html"
      : `file://${path.join(__dirname, "../build/loading.html")}`
  );

  loadingScreen.on("closed", () => (loadingScreen = null));
  // console.log("ready to show");
  // loadingScreen.show();

  loadingScreen.once("ready-to-show", () => {
    console.log("ready to showxx");
    loadingScreen.show();
  });
  //loadingScreen.webContents.on("did-finish-load", () => {});
  return loadingScreen;
};

module.exports = {
  createLoadingScreen
};
