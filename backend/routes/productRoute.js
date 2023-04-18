const express  = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetail } = require('../controllers/productController');
const { isAuthenticatedUser } = require('../middleware/auth');

const router  = express.Router();

router.route('/products').get(isAuthenticatedUser,getAllProducts)
router.route('/product/new').post(createProduct)
router.route('/product/:id').put(updateProduct)
router.route('/product/:id').delete(deleteProduct)
router.route('/product/:id').get(getProductDetail)


module.exports = router;