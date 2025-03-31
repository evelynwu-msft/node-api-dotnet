const { ipcRenderer } = require('electron/renderer')

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }

  ipcRenderer.on('dotnet-version', (_event, value) => {
    const element = document.getElementById('dotnet-version')
    if (element) element.innerText = value
  })

  ipcRenderer.on('system-memory-usage-committed', (_event, value) => {
    const element = document.getElementById('system-memory-usage-committed')
    if (element) element.innerText = value
  })

  ipcRenderer.on('system-memory-usage-total', (_event, value) => {
    const element = document.getElementById('system-memory-usage-total')
    if (element) element.innerText = value
  })
})
