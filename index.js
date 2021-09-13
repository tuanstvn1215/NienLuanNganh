const express = require('express')
const app = express()
const port = 3000
const cookieParser = require('cookie-parser')
const serect = 'sdfsdfsdfsdfsdfsd12432%$$$%$$'

const shopRouter = require('./routes/shop.route')

app.set('view engine', 'pug')
app.set('views', './views')

app.use(cookieParser(serect))
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.static('public'))
app.get('', (req, res) => {
    res.redirect('/shop')
})
app.use('/shop', shopRouter)

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
