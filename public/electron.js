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

function createWindow() {
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
    isDev && mainWindow.openDevTools();
  });
}

app.on("ready", createWindow);

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
