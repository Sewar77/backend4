//products: name(not null, string, ),catId, descripiton(String), image, price, stock(how many items in the storage)
import mongoose from "mongoose"
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required. "],
        minLength: [5, "Minmim length allowed is 5 charecters"],
        trim: true
    },
    description: {
        type: String,
        trim: true,
        default: ""
    },
    image: {
        type: String,
    },
    catId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Category Name is Required"]
    },
    price: {
        type: Number,
        required: true,
        default: 1,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    status: {
        type: String,
        required: true,
        // accepted, pending, rejected
        enum: ['accepted', 'pending', 'rejected'],
        default: 'accepted',
    }
},
    { timestamps: true }
)

const Product = mongoose.model("Product", productSchema)
export default Product