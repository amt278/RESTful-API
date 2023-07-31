const path = require('path')
const express = require('express')
const app = express()

process.on('uncaughtException', (excep) => {
    console.log(`uncaught exception! ${excep}`)
    process.exit(1)
})
process.on('unhandledRejection', (excep) => {
    console.log(`unhandled rejection! ${excep}`)
    process.exit(1)
})

// remove comment if the app depends on this var
// const config = require('config')
// if (!config.get('jwtsec')) {
//     console.log('env var error...')
//     process.exit(-1)
// }

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/test').then(() => {
    console.log('DB connected.....')
}).catch((err) => {
    console.log(err)
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/assets', express.static('public'))
// use custom middleware
const logging = require('./middlewares/logging')
app.use(logging)

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const helmet = require('helmet')
app.use(helmet())

const studentRouter = require('./routes/students')
app.use('/api/students', studentRouter)

const userRouter = require('./routes/user')
app.use('/api/users', userRouter)

const authRouter = require('./routes/auth')
app.use('/api/login', authRouter)

const adminRouter = require('./routes/admin')
app.use('/api/admin', adminRouter)

const errorMW = require('./middlewares/errorMW')
app.use(errorMW)

const ejs = require('ejs')
// app settings
app.set('template engine', 'ejs')
// app.set('views', 'templates') // if we want to change the name of views folder to templates

const port = process.env.PORT || 3000 // to set the port by the server env

// all http request method
app.all('*', (req, res, next) => {
    console.log('HTTP request received....')
    next()
})

// all GET request
app.get('*', (req, res, next) => {
    console.log('GET request received....')
    next()
})

app.get('/', (req, res) => {
    // console.log(`req: ${req.url}`)

    // res.send(`this is home page`)
    res.sendFile(path.join(__dirname, 'form.html'))    
})



// send data via query string in url
app.get('/welcome.html', (req, res) => {
    console.log(req.query)
    console.log(`username: ${req.query.username}`)
    console.log(`id: ${req.query.id}`)

    res.sendFile(path.join(__dirname, 'welcome.html'))
})

// send data via request body
app.post('/welcome.html', (req, res) => {
    console.log(`body: ${JSON.stringify(req.body)}`)
    
    res.cookie('username', Buffer.from(req.body.username).toString('base64'), {httpOnly: true})
    res.cookie('age', 21)
    res.send(`hi ${req.body.username}:)`)
})



// cookie request
app.get('/abc', (req, res) => {
    console.log(`req cookie username: ${Buffer.from(req.cookies.username, 'base64').toString()}`)

    res.sendStatus(200)
})

app.listen(3000, () => {
    console.log(`listening to port:${port} .........`)
})