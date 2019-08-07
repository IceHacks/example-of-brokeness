const { app, BrowserWindow, session } = require("electron");
const path = require("path");
const extension = require("electron-extensions");

if (require("electron-squirrel-startup")) {
	app.quit();
}

let mainWindow;

const createWindow = async () => {
	var ex = new extension.ExtensibleSession(session.defaultSession);

	/**
	 * ./extension
	 *
	 * Test this extension in chrome
	 * and then test it  in electron
	 * although this example doesn't
	 * give the  "Skipping extension
	 * with  invalid URL"  error  it
	 * still doesn't work.
	 */
	await ex.loadExtension(path.resolve(__dirname, "./extension/"));

	mainWindow = new BrowserWindow({
		width: 1064,
		height: 600
	});

	mainWindow.loadURL(`https://google.com/`);
	mainWindow.on("closed", () => {
		mainWindow = null;
	});
};

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
