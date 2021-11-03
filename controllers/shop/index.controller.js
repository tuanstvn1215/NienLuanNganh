const Controller = require('../../core/controller')
const ProductModel = require('../../models/product.model')
const ProductCategoryModel = require('../../models/productCategory.model')
class IndexController extends Controller {
    constructor() {
        super()
    }

    getIndex = async (req, res) => {
        const starproductsheader = await ProductModel.find({
            category: req.query.category,
            status: 1,
        })
            .sort({ price: -1 })
            .limit(5)

        const starproducts = []
        const productCategory = await ProductCategoryModel.find({ status: 1 })
        for (let index = 0; index < productCategory.length; index++) {
            const category = productCategory[index]
            let tempproducts = await ProductModel.find({
                category: category,
                status: 1,
            }).limit(4)

            starproducts.push({ category, tempproducts })
        }
        console.log(starproducts)
        res.render('shop/index', {
            productCategory: productCategory,
            starproductsheader: starproductsheader,
            user: res.locals.user,
            starproducts: starproducts,
        })
    }
}
module.exports = new IndexController()
