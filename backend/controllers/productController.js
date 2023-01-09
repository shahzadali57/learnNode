// GETTING FROM USER THROUGH SCHEMA
const Product = require('../model/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require("../middleware/catchAsyncErrors")


//creating product 

exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
});  


// GET ALL PRODUCTS
exports.getAllProducts = catchAsyncErrors(async (req, res) => {

    const products = await Product.find()
    res.status(200).json({
        success: true,
        products
    })

})

// GET PRODUCT DETAIL
exports.getProductDetail = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);


    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }

    res.status(200).json({
        success: true,
        product
    })

})

// update products
exports.updateProduct = catchAsyncErrors( async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {

        return next(new ErrorHandler("product not found", 404))

    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,                                                           // this option returns the updated document rather than the original document.
        runValidators: true,                                                // this option runs the validators for the update operation. Validators are functions that check if the data being updated is valid according to the schema for the model.
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        product
    })


})

// DELETING A PRODUCT

exports.deleteProduct = catchAsyncErrors( async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) {

        return next(new ErrorHandler("product not found", 404))

    }

    // product = await Product.findByIdAndDelete(req.params.id,req.body,{
    //     new: true,
    //     runValidators: true,
    //     useFindAndModify: false

    //     })
    // await product.remove()

    res.status(200).json({
        success: true,
        message: "product has been deleted"
    })
})

