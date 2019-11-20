const { app, Menu } = require("electron");
const isDev = require("electron-is-dev");
const isWindows = process.platform === "win32";

module.exports = {
  setMainMenu
};

function setMainMenu(mainWindow) {
  const template = [
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
          label: isWindows ? "Exit" : `Quit ${app.getName()}`,
          accelerator: isWindows ? "Alt+F4" : "CmdOrCtrl+Q",
          click() {
            app.quit();
          }
        }
      ]
    }
  ];
  // - Push Developer menu on if in Dev Mode
  if (isDev || !isDev) {
    template.push({
      label: "Developer",
      submenu: [
        { role: "reload" },
        { role: "forcereload" },
        { role: "toggledevtools" }
      ]
    });
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
