const express = require('express')
const router = express.Router()
const {getProducts,getProductById,createProduct,updateProduct,deleteProduct} = require('../controllers/product')

// router.get('/', getProducts)

// router.get('/:id', getProductById)
// router.post('/', createProduct)
// //PUT METHOD
// router.put('/:id', updateProduct)

// //DELETE METHOD
// router.delete('/:id', deleteProduct)


router.route('/').get(getProducts).post(createProduct)
router.route('/:id').get(getProductById).put(updateProduct).delete(deleteProduct)

module.exports = router