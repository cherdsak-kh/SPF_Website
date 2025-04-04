/*
    - เซิร์ฟเวอร์หลักของเว็บไซต์ SPF : Arma 3 Milsim Community
*/
// ------------------------------------------------------------------------------------------------------------------------->

require('dotenv').config();
const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const fs = require('fs');
const path = require('path');

// ------------------------------------------------------------------------------------------------------------------------->

const consoler = require('./public/function/consoler')
const getPath_Consoler = require('./public/function/getPath-Consoler')

// ------------------------------------------------------------------------------------------------------------------------->

const port = process.env.PORT || process.env.LOCAL_PORT;
const app = express()
const server = createServer(app)
const io = new Server(server)

// ------------------------------------------------------------------------------------------------------------------------->

app.set('view engine', 'ejs')
app.use(express.static('views'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// ------------------------------------------------------------------------------------------------------------------------->

const menuPath = path.join(__dirname, 'public', 'json', 'menu.json');
const menuData = fs.readFileSync(menuPath, 'utf-8');
const Menu = JSON.parse(menuData);
  
// ------------------------------------------------------------------------------------------------------------------------->
/*

    - DATABASE CONNECTION.

*/
// ------------------------------------------------------------------------------------------------------------------------->
/*

    - MongoDB CONNECTION.

*/
// ------------------------------------------------------------------------------------------------------------------------->

// # Render index page.
app.get('/', async (req, res) => {

    getPath_Consoler(req)

    try {
        res.render('pages/index', {
            pageName: Menu[0].enName,
            pageTitle: Menu[0].thName + ' | SPF : Milsim Community',
            menu: Menu,
            req: req
        })

    } catch (err) {
        consoler('#ff4747', `File read error: ${err}`)

    }

})

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++>

// # Render news page.
app.get('/news', async (req, res) => {
    
    getPath_Consoler(req)

    try {
        res.render('pages/news', {
            pageName: Menu[1].enName,
            pageTitle: Menu[1].thName + ' | SPF : Milsim Community',
            menu: Menu,
            req: req
        })

    } catch (err) {
        consoler('#ff4747', `File read error: ${err}`)

    }

})

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++>

// # Render event page.
app.get('/event', async (req, res) => {
    
    getPath_Consoler(req)

    try {
        res.render('pages/event', {
            pageName: Menu[2].enName,
            pageTitle: Menu[2].thName + ' | SPF : Milsim Community',
            menu: Menu,
            req: req
        })

    } catch (err) {
        consoler('#ff4747', `File read error: ${err}`)

    }

})

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++>

// # Render gallery page.
app.get('/media', async (req, res) => {
    
    getPath_Consoler(req)

    try {
        res.render('pages/media', {
            pageName: Menu[3].enName,
            pageTitle: Menu[3].thName + ' | SPF : Milsim Community',
            menu: Menu,
            req: req
        })

    } catch (err) {
        consoler('#ff4747', `File read error: ${err}`)

    }

})

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++>

// # Render streaming page.
app.get('/streaming', async (req, res) => {
    
    getPath_Consoler(req)

    try {
        res.render('pages/streaming', {
            pageName: Menu[4].enName,
            pageTitle: Menu[4].thName + ' | SPF : Milsim Community',
            menu: Menu,
            req: req
        })

    } catch (err) {
        consoler('#ff4747', `File read error: ${err}`)

    }

})

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++>

// # Render rules page.
app.get('/serverrules', async (req, res) => {
    
    getPath_Consoler(req)

    try {
        res.render('pages/rules', {
            pageName: Menu[5].enName,
            pageTitle: Menu[5].thName + ' | SPF : Milsim Community',
            menu: Menu,
            req: req
        })

    } catch (err) {
        consoler('#ff4747', `File read error: ${err}`)

    }

})

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++>

// # Render articles page.
app.get('/articles', async (req, res) => {
    
    getPath_Consoler(req)

    try {
        res.render('pages/articles', {
            pageName: Menu[6].enName,
            pageTitle: Menu[6].thName + ' | SPF : Milsim Community',
            menu: Menu,
            req: req
        })

    } catch (err) {
        consoler('#ff4747', `File read error: ${err}`)

    }

})

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++>

// # Render about page.
app.get('/about', async (req, res) => {

    getPath_Consoler(req)

    try {
        res.render('pages/about', {
            pageName: Menu[7].enName,
            pageTitle: Menu[7].thName + ' | SPF : Milsim Community',
            menu: Menu,
            req: req
        })

    } catch (err) {
        consoler('#ff4747', `File read error: ${err}`)

    }

})

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++>

// # Render contact page.
app.get('/contact', async (req, res) => {
    
    getPath_Consoler(req)

    try {
        res.render('pages/contact', {
            pageName: Menu[8].enName,
            pageTitle: Menu[8].thName + ' | SPF : Milsim Community',
            menu: Menu,
            req: req
        })

    } catch (err) {
        consoler('#ff4747', `File read error: ${err}`)

    }

})

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++>

// # Render cookie-policy page.
app.get('/cookie-policy', async (req, res) => {
    
    getPath_Consoler(req)

    try {
        res.render('pages/cookie-policy', {
            pageName: 'cookie-policy',
            pageTitle: 'นโยบายการใช้คุกกี้ | SPF : MilSim Community',
            menu: Menu,
            req: req
        })

    } catch (err) {
        consoler('#ff4747', `File read error: ${err}`)

    }

})

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++>

// # Render 404 Not found.
app.get('*', (req, res) => {

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    consoler('#ff4747', `Server >> : Client >> ${ip} | 404 Not found >> ${req.originalUrl} | Redirecting...`)

    res.status(404).render('pages/404NotFound', {
        curTitle: '404 Not Found'
    })
})

// ------------------------------------------------------------------------------------------------------------------------->

io.on('connection', (socket) => {
    // consoler('#ffffff', 'Socket.io : user connected.')

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++>

    // ตรวจสอบคุกกี้
    const cookieConsent = socket.handshake.headers.cookie?.split('; ').find(c => c.startsWith('cookieConsent='));
    
    if (cookieConsent && cookieConsent.split('=')[1] === 'accepted') {
        socket.emit('cookieAccepted', true); // ส่งสถานะการยอมรับ
    } else {
        socket.emit('cookieAccepted', false); // ส่งสถานะไม่ยอมรับ
    }

    // เมื่อผู้ใช้กดยอมรับคุกกี้
    socket.on('acceptCookie', () => {
        socket.emit('cookieAccepted', true); // ส่งสถานะการยอมรับ
    });

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++>

    socket.on('request-events-data', async () => {
        try {

            const eventPath = path.join(__dirname, 'public', 'json', 'events.json');
            const eventData = fs.readFileSync(eventPath, 'utf-8');
            const events = JSON.parse(eventData);

            socket.emit('Events-data', events);

        } catch (err) {
            consoler('#ff4747', `== Send events data ==> Error : ${err}`);
        }
    });
    
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++>

    socket.on('request-articles-data', async () => {
        try {

            const articlePath = path.join(__dirname, 'public', 'json', 'articles.json');
            const articleData = fs.readFileSync(articlePath, 'utf-8');
            const articles = JSON.parse(articleData);

            socket.emit('Articles-data', articles);
            
        } catch (err) {
            consoler('#ff4747', `== Send articles data ==> Error : ${err}`);
        }
    })
    
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++>

    socket.on('request-rules-data', async () => {
        try {

            const rulePath = path.join(__dirname, 'public', 'json', 'rules.json');
            const ruleData = fs.readFileSync(rulePath, 'utf-8');
            const rules = JSON.parse(ruleData);

            socket.emit('rules-data', rules);
            
        } catch (err) {
            consoler('#ff4747', `== Send rules data ==> Error : ${err}`);
        }
    })
    
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++>

    socket.on('disconnect', () => {
        // consoler('#ffffff', 'Socket.io : user disconnected.')
    })
})

// ------------------------------------------------------------------------------------------------------------------------->

server.listen(port, () => {

    console.log('---------------------------------------------------------------------------------------------------------')
    consoler('#49ff00', `Server is running on port ${port}`)
})

// ------------------------------------------------------------------------------------------------------------------------->