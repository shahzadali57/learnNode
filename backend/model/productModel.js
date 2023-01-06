const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema =  new Schema({
     productName : {
          type: String,
          required: true
     },
     description : {
          type: String,
          required: [true, "please enter product description"]
     },
     price : {
          type: Number,
          required: [true, "please enter product price"],
          maxlength: [8, "price cannot be exceed 8 characters"],
     },
     rating : {
          type: Number,
          default: 0,
     },
    image : [
        {
             public_id: {
                   type: String,
                    required: true
              },
               url: {
                    type: String,
                   required: true
              },
          },
     ],
     category : {
          type: String,
          required: [true, "please enter category"]
     },
     stock : {
          type: Number,
          required: [true, "please enter product stock"],
          maxlength: [4, "stock cannot be exceed 4 characters"],
          default: 1
     },
     numOfReviews :{
          type: Number,
          default: 0
     },
     reviews : [
          {
               user: {
                    type: String,
                    ref: "user",
                   //required: true
               },
               name: {
                    type: String,
                 //   required: true,
               },
               rating: {
                    type: Number,
                   // required: true
               },
               comment: {
                    type: String,
                  // required: true
               }

 
          }
     ],
     user : {
          type: mongoose.Schema.ObjectId,
          ref: "user",
          //required: true
     },
     createdAt :{
          type: Date,
          default: Date.now
     }
}
)

module.exports = mongoose.model("product", productSchema);