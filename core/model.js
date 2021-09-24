const mongoose = require('mongoose')
mongoose.connect(
    'mongodb+srv://ffff:G1IKq4qqUcRSv57c@cluster0.fawt6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    },
    (err) => {
        if (err) {
            console.log(`không thể kết nối Mongodb, lỗi:${err}`)
        } else {
            console.log('kết nối Mongodb thành công')
        }
    }
)
module.exports = mongoose
