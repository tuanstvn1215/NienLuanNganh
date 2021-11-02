const Controller = require('../../core/controller')
const ProductModel = require('../../models/product.model')
const ProductCategoryModel = require('../../models/productCategory.model')
const ProductProviderModel = require('../../models/productProvider.model')
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: 'ddl3d69rg',
    api_key: '945817266175385',
    api_secret: 'nO3QKJxR1JOn4ekiAbSS-SctK3k',
    secure: true,
})
class ProductController extends Controller {
    constructor() {
        super()
    }
    show = async (req, res) => {
        const product_category = await ProductCategoryModel.find({ status: 1 })

        res.render('admin/product', { product_category: product_category })
    }
    create = async (req, res) => {
        const product_category = await ProductCategoryModel.find({ status: 1 })
        const product_provider = await ProductProviderModel.find({ status: 1 })

        res.render('admin/add_product', {
            product_category: product_category,
            product_provider: product_provider,
            ref: req.originalUrl,
        })
    }

    store = async (req, res) => {
        let name = req.body.name
        let status = req.body.status
        let provider = req.body.provider
        let category = req.body.category
        let price = req.body.price
        let img = []
        try {
            const imageFile = [].concat(req.files.img)
            const paths = imageFile.map((item) => {
                return item.path
            })
            console.log(paths)
            await Promise.all(
                paths.map(async (element) => {
                    await cloudinary.uploader
                        .upload(element)
                        .then(function (image) {
                            console.log(
                                '** file uploaded to Cloudinary service'
                            )
                            img.push(image.url)
                        })
                })
            )

            console.log(img)
            await ProductModel.insertMany({
                name: name,
                status: status,
                provider: provider,
                category: category,
                price: price,
                img: img,
            }).catch((err) => {
                res.json({
                    code: 403,
                    message: 'lưu thất bại vì lỗi: ' + err.message,
                })
            })
            res.json({
                code: 200,
                message: 'lưu thành công',
            })
        } catch (ex) {
            res.json({
                code: 403,
                message: 'lưu thất bại vì lỗi: ' + ex.message,
            })
        }

        try {
            res.send({ code: 200, message: 'lưu thành công' })
        } catch (error) {
            res.redirct('/admin/product/create')
        }
    }
    detele = async (req, res) => {
        try {
        } catch (error) {}
    }
}

module.exports = new ProductController()
