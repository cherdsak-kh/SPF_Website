// ------------------------------------------------------------------------------------------------------------------------->

const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const { MongoClient } = require("mongodb");

// ------------------------------------------------------------------------------------------------------------------------->

const consoler = require('./public/function/consoler')
const getPath_Consoler = require('./public/function/getPath-Consoler')

// ------------------------------------------------------------------------------------------------------------------------->

const port = 3000
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

/*

    - DATABASE CONNECTION.

*/

// ------------------------------------------------------------------------------------------------------------------------->
/*
    - MongoDB CONNECTION.
*/
const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.3"
const client = new MongoClient(uri)

async function mongodbExecute() {
    // * Check connection.
    try {
        await client.connect();
        consoler('#49ff00', `Server is connected to mongodb successfully.`);
    } catch (err) {
        consoler('#ff4747', `Server connecting to mongodb failed: ${err}`);
        return;
    }

    // * ดึงข้อมูลทั้งหมดจากคอลเลกชัน Events ที่ eventName มีคำว่า "MilSim" ด้วยการใส่ { eventName: /MilSim/ }
    // const allData = client.db('SPF_Database').collection('Events');
    // const data = await allData.find({}).toArray();

    // Sort by dateTime in descending order
    // data.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

    // Print the sorted array
    // data.forEach(event => {
    //     console.log(`${event.eventName} - ${event.dateTime}`);
    // });

    // * Loop ผ่านข้อมูลที่ได้และแสดงค่า missionImg ของแต่ละ document
    // data.forEach(event => {
    //     console.log(event.missionImg);
    // });

    await client.close();
}

mongodbExecute().catch(console.dir);

// ------------------------------------------------------------------------------------------------------------------------->

// # Render index page.
app.get('/', async (req, res) => {

    getPath_Consoler(req)

    try {
        await client.connect()
        const data = client.db('SPF_Database').collection('Menu')
        const Menu = await data.find().toArray()

        res.render('pages/index', {
            pageName: Menu[0].enName,
            pageTitle: Menu[0].thName + ' | SPF : Milsim Community',
            menu: Menu
        })

    } catch (err) {
        consoler('#ff4747', `MongoDB error: ${err}`)

    } finally {
        await client.close()

    }

})

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++>

// # Render about page.
app.get('/about', async (req, res) => {

    getPath_Consoler(req)

    try {
        await client.connect()
        const data = client.db('SPF_Database').collection('Menu')
        const Menu = await data.find().toArray()

        res.render('pages/about', {
            pageName: Menu[1].enName,
            pageTitle: Menu[1].thName + ' | SPF : Milsim Community',
            menu: Menu
        })

    } catch (err) {
        consoler('#ff4747', `MongoDB error: ${err}`)

    } finally {
        await client.close()

    }

})

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++>

// # Render rules page.
app.get('/termsandconditions', async (req, res) => {
    
    getPath_Consoler(req)

    try {
        await client.connect()
        const data = client.db('SPF_Database').collection('Menu')
        const Menu = await data.find().toArray()

        res.render('pages/rules', {
            pageName: Menu[2].enName,
            pageTitle: Menu[2].thName + ' | SPF : Milsim Community',
            menu: Menu
        })

    } catch (err) {
        consoler('#ff4747', `MongoDB error: ${err}`)

    } finally {
        await client.close()

    }

})

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++>

// # Render event page.
app.get('/event', async (req, res) => {
    
    getPath_Consoler(req)

    try {
        await client.connect()
        const data1 = client.db('SPF_Database').collection('Menu')
        const Menu = await data1.find().toArray()

        res.render('pages/event', {
            pageName: Menu[3].enName,
            pageTitle: Menu[3].thName + ' | SPF : Milsim Community',
            menu: Menu
        })

    } catch (err) {
        consoler('#ff4747', `MongoDB error: ${err}`)

    } finally {
        await client.close()

    }

})

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++>

// # Render community page.
app.get('/articles', async (req, res) => {
    
    getPath_Consoler(req)

    try {
        await client.connect()
        const data1 = client.db('SPF_Database').collection('Menu')
        const Menu = await data1.find().toArray()

        res.render('pages/articles', {
            pageName: Menu[4].enName,
            pageTitle: Menu[4].thName + ' | SPF : Milsim Community',
            menu: Menu
        })

    } catch (err) {
        consoler('#ff4747', `MongoDB error: ${err}`)

    } finally {
        await client.close()

    }

})

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++>

// # Render cookie-policy page.
app.get('/cookie-policy', async (req, res) => {
    
    getPath_Consoler(req)

    try {
        await client.connect()
        const data = client.db('SPF_Database').collection('Menu')
        const Menu = await data.find().toArray()

        res.render('pages/cookie-policy', {
            pageName: 'cookie-policy',
            pageTitle: 'นโยบายการใช้คุกกี้ | SPF : MilSim Community',
            menu: Menu
        })

    } catch (err) {
        consoler('#ff4747', `MongoDB error: ${err}`)

    } finally {
        await client.close()

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
            await client.connect();
            // console.log('== Send events data ==> Start');

            const allData = client.db('SPF_Database').collection('Events');
            const data = await allData.find({}).toArray();

            socket.emit('Events-data', data);  // Send the retrieved data to the client

            // console.log('== Send events data ==> End');
        } catch (err) {
            consoler('#ff4747', `== Send events data ==> Error : ${err}`);
        } finally {
            await client.close();
        }
    });
    
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++>

    socket.on('request-articles-data', async () => {
        try {
            await client.connect();

            const allData = client.db('SPF_Database').collection('Articles');
            const data = await allData.find({}).toArray();

            socket.emit('Articles-data', data);
            
        } catch (err) {
            consoler('#ff4747', `== Send articles data ==> Error : ${err}`);
        } finally {
            await client.close();
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