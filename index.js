const express = require('express')
const app = express()
const port = 3000
const cookieParser = require('cookie-parser')
const serect = 'sdfsdfsdfsdfsdfsd12432%$$$%$$'
const multipart = require('connect-multiparty')
const shopRouter = require('./routes/shop.route')
const multipartMiddleware = multipart()
app.set('view engine', 'pug')
app.set('views', './views')

app.use(cookieParser(serect))

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.post('/test', (req, res) => {
    let ipCardAttempt = ('' || req.connection.remoteAddress)
        .split(',')[0]
        .trim()
    console.log(ipCardAttempt)
    res.send(ipCardAttempt)
})
app.use(multipartMiddleware)

app.use(express.static('public'))
app.get('/admin', (req, res) => {
    res.send('hello')
})
app.use('/', shopRouter)

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
