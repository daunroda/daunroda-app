// The built directory structure
//
// ├─┬ dist
// │ ├─┬ electron
// │ │ ├─┬ main
// │ │ │ └── index.js
// │ │ └─┬ preload
// │ │   └── index.js
// │ ├── index.html
// │ ├── ...other-static-files-from-public
// │
process.env.DIST = join(__dirname, "../..");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : join(process.env.DIST, "../public");

import { Daunroda } from "daunroda";
import { app, BrowserWindow, dialog, ipcMain } from "electron";
import { autoUpdater } from "electron-updater";
import { release } from "os";
import { join } from "path";

// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null;
const url = process.env.VITE_DEV_SERVER_URL as string;
const indexHtml = join(process.env.DIST, "index.html");

async function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    icon: join(process.env.PUBLIC, "logo.png"),
    autoHideMenuBar: true,
    webPreferences: {
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (app.isPackaged) {
    await win.loadFile(indexHtml);
  } else {
    await win.loadURL(url);
    win.webContents.openDevTools();
  }
}

app.on("ready", async () => {
  await createWindow();
  await autoUpdater.checkForUpdatesAndNotify();
});

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

// Select folder
ipcMain.handle("showDialog", async () => {
  const { filePaths } = await dialog.showOpenDialog(win, {
    properties: ["openDirectory"],
  });
  return filePaths[0];
});

// Download
ipcMain.handle("download", (e, config) => {
  const client = new Daunroda(config);

  client.on("info", (info) => e.sender.send("info", info));
  client.on("debug", (debug) => e.sender.send("debug", debug));
  client.on("error", (error) => e.sender.send("error", error));
  client.on("progress", (prog) => e.sender.send("progress", prog));

  client.run().catch((err) => e.sender.send("error", err));
});

ipcMain.handle("version", () => {
  return app.getVersion();
});
