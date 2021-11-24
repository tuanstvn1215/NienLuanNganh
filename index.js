const express = require('express')
const app = express()
const port = 3000
const cookieParser = require('cookie-parser')
const serect = 'sdfsdfsdfsdfsdfsd12432%$$$%$$'
const multipart = require('connect-multiparty')
const shopRouter = require('./routes/shop.route')
const adminRouter = require('./routes/admin.route')
const { requireadmin } = require('./middlewares/auth.middleware')
const ProductModel = require('./models/product.model')
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

app.use(multipartMiddleware)

app.use(express.static('public'))

app.use('/admin', requireadmin, adminRouter)
app.use('/', shopRouter)

//sử lý lỗi

app.use(function (req, res, next) {
    res.status(404)

    //trả về html page
    if (req.accepts('html')) {
        res.render('shop/error')
        return
    }

    // trả về json
    if (req.accepts('json')) {
        res.json({ error: 'không tìm thấy trang' })
        return
    }

    // trả về text send()
    res.type('txt').send('không tìm thấy trang')
})

//chạy app
app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
