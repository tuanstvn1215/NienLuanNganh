const Controller = require('../../core/controller')
const ProductModel = require('../../models/product.model')
const ProductCategoryModel = require('../../models/productCategory.model')
class IndexController extends Controller {
    constructor() {
        super()
    }

    getIndex = async (req, res) => {
        const product = ProductModel.find()
        const starproducts = []
        const productCategory = ProductCategoryModel.find({ status: 1 })
        for (let index = 0; index < productCategory.length; index++) {
            const element = productCategory[index]
            let tempproducts = await ProductModel.find({ category: element })
            starproducts.push(tempproducts)
        }
        console.log(starproducts)

        res.render('shop/index', {
            user: res.locals.user,
            starproducts: starproducts,
        })
    }
}
module.exports = new IndexController()
