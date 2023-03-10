const mongoose = require('mongoose');

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    product: String,
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                }
            }
        ],
        default: []
    },
    quantity: String
}, {versionKey: false});

const cartModel = mongoose.model(cartCollection, cartSchema);

module.exports = cartModel;