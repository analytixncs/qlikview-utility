const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS
} = require("electron-devtools-installer");

const path = require("path");
const isDev = require("electron-is-dev");

const { setMainMenu } = require("./menu");

let mainWindow;
let loadingScreen;
function createWindow(loadingScreen) {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    show: false,
    icon: path.join(__dirname, "../assets/icons/png/64x64.png"),
    webPreferences: {
      nodeIntegration: true, // needed if going to access file system
      backgroundThrottling: false
    },
    title: "Analytix Utility" // Make sure to delete title tag in index.html if it exists
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  setMainMenu(mainWindow);

  mainWindow.on("closed", () => (mainWindow = null));
  // If in development mode, then load the dev tools
  if (isDev) {
    installDevTools();
  }
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    setTimeout(() => {
      if (loadingScreen) {
        loadingScreen.close();
      }
      isDev && mainWindow.openDevTools();
    }, 1000);
  });
}

const createLoadingScreen = () => {
  /// create a browser window
  loadingScreen = new BrowserWindow({
    /// define width and height for the window
    width: 600,
    height: 400,
    /// remove the window frame, so it will become a frameless window
    frame: false,
    /// and set the transparency, to remove any window background color
    transparent: true,
    webPreferences: {
      nodeIntegration: true // needed if going to access file system
    },
    alwaysOnTop: true,
    show: false,
    backgroundColor: "#ffffff"
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

  // loadingScreen.once("ready-to-show", () => {
  //   loadingScreen.show();
  // });
  loadingScreen.webContents.on("did-finish-load", () => {
    loadingScreen.show();
  });
};
//---------------------------------------
// - APP STARTUP
//---------------------------------------
// app.on("ready", createWindow);
app.on("ready", () => {
  console.log("app ready");
  createLoadingScreen();
  createWindow(loadingScreen);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

//---------- MENU TEMPLATE ---------------------//
const menuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Settings",
        click() {
          mainWindow.webContents.send("route-settings");
        }
      },
      {
        label: "Quit",
        accelerator: (() => {
          if (process.platform === "darwin") {
            return "Command+Q";
          } else {
            return "Ctrl+Q";
          }
        })(),
        click() {
          app.quit();
        }
      }
    ]
  }
];

if (process.platform === "darwin") {
  menuTemplate.unshift({});
}

//---------- INSTALL DEV TOOLS ---------------------//
const installDevTools = () => {
  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => {
      console.log(`Added Extension: ${name}`);
    })
    .catch(err => {
      console.log("An error occurred: ", err);
    });

  installExtension(REDUX_DEVTOOLS)
    .then(name => {
      console.log(`Added Extension: ${name}`);
    })
    .catch(err => {
      console.log("An error occurred: ", err);
    });
};
