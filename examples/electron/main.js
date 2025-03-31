const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')

  const dotnet = require('node-api-dotnet')
  const dotnetVersion = dotnet.System.Environment.Version.toString()
  require('./bin/Microsoft.Windows.SDK.NET.js')
  const systemMemoryUsageReport = dotnet.Windows.System.Diagnostics.SystemDiagnosticInfo.GetForCurrentSystem().MemoryUsage.GetReport()
  const committedMemory = (systemMemoryUsageReport.CommittedSizeInBytes / 1024 / 1024).toString()
  const totalMemory = (systemMemoryUsageReport.TotalPhysicalSizeInBytes / 1024 / 1024).toString()
  win.webContents.send('dotnet-version', dotnetVersion)
  win.webContents.send('system-memory-usage-committed', committedMemory)
  win.webContents.send('system-memory-usage-total', totalMemory)
  const dotnetVersion2 = dotnet.System.Environment.Version.toString()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
