const {app, BrowserWindow}  = require('electron');


let mainWindow;

function onClosed()
{
  mainWindow=null;
}


function createMainWindow()
{
  const win = new BrowserWindow(
  {
    width: 1000,
    height: 700,
    frame:false,
    minWidth: 700,
    minHeight: 500

  });
  win.setMenu(null); //cacher la barre des menus
  win.loadFile('./html/index.html');
  win.on('closed', onClosed);
  win.openDevTools();

  return win;
}

app.on('window-all-closed', () =>
{
  if(process.platform !== 'darwin')
  {
    app.quit();
  }
});

app.on('activate', () =>
{
  if(!mainWindow)
  {
    mainWindow = createMainWindow();
  }
});

app.on('ready', () =>
{
  mainWindow = createMainWindow();
});
