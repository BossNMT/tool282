require('dotenv').config();
const path = require('path')
const express = require('express');
const appExpress = express();
const PORT = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000;
const router = require('./router');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const { app, BrowserWindow } = require('electron')

// Fix memory leak
// or 0 to turn off the limit
require('events').EventEmitter.defaultMaxListeners = 0


// Connect DB
// db.connect();

//Cấu hình phương thức GET, POST, PUT, PATCH
appExpress.use(methodOverride('_method'))

//Cấu hình handlebars
appExpress.engine('hbs', handlebars({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
        formatMoney: (str) => {
            if (str) {
                return str.split('').reverse().reduce((prev, next, index) => {
                    return ((index % 3) ? next : (next + ',')) + prev
                })
            }
        },
        prettifyDate: function (timestamp) {
            function addZero(i) {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            }

            var curr_date = timestamp.getDate();
            var curr_month = timestamp.getMonth();
            curr_month++;
            var curr_year = timestamp.getFullYear();

            var curr_hour = timestamp.getHours();
            var curr_minutes = timestamp.getMinutes();
            var curr_seconds = timestamp.getSeconds();

            result = addZero(curr_date) + "/" + addZero(curr_month) + "/" + addZero(curr_year) + '   ' + addZero(curr_hour) + ':' + addZero(curr_minutes) + ':' + addZero(curr_seconds);
            return result;
        }
    },
}));
appExpress.set('view engine', '.hbs');
appExpress.set('views', path.join(__dirname, 'resources', 'views'));

// Xử lý khi đường dẫn là file tĩnh thì sẽ lao vào public
appExpress.use(express.static(path.join(__dirname, 'public')));

//Lấy dữ liệu từ POST
appExpress.use(express.urlencoded({
    extended: true
}));
appExpress.use(express.json());

//Router init
router(appExpress);

//Localhost 3000
appExpress.listen(PORT, console.log(`Localhost: ${PORT}`));

app.whenReady().then(() => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
    })

    mainWindow.loadURL(`http://localhost:${PORT}`)  //ADD THIS
    mainWindow.on('closed', function () {
        mainWindow = null
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
