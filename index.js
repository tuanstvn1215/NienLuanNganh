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

app.use('/', shopRouter)

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
// Example POST method implementation:
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached

        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    return response.json() // parses JSON response into native JavaScript objects
}

postData('https://example.com/answer', { answer: 42 }).then((data) => {
    console.log(data) // JSON data parsed by `data.json()` call
})
var HttpsProxyAgent = require('https-proxy-agent')
var request = require('request')
var proxy = process.env.QUOTAGUARDSTATIC_URL
var agent = new HttpsProxyAgent(proxy)
request(
    {
        uri: 'https://example.com/api',
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        agent: agent,
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 20,
        body: 'name=john',
    },
    function (error, response, body) {
        console.log('Error' + error)
        console.log('Response: ' + response)
        console.log('Body: ' + body)
    }
)
