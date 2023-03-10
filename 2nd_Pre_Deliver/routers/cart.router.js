const { Router } = require('express');
const cartModel = require('../models/cart.model');

const cartRouter = Router();

cartRouter.get('/', async (req, res) => {
    try{
        let carts = await cartModel.find().populate('products.product');
        res.send(carts);
    }
    catch(error){
        console.log(`Cannot get carts with mongoose ${error}`);
    }
});

cartRouter.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    try{
        let cart = await cartModel.find({_id: cid}).populate('products.product');
        res.send(cart);
    }
    catch(error){
        console.log(`Cannot get cart with mongoose ${error}`);
    }
});

cartRouter.post('/', async (req, res) => {
    const data = req.body;
    let {product, quantity} = data;
    if(!product || !quantity) return res.send({ status: "Error", error: "Incomplete values"});
    try{
        await cartModel.create({
            product,
            quantity
        }).then( async cart => {
            let cartId = cart._id.toHexString();
            cart.products.push({ product: product });
            await cartModel.updateOne({_id: cartId}, cart );
        });

        res.send("Cart create success");
    }
    catch(error){
        console.log(`Cannot send cart to mongoose ${error}`);
    }
});

cartRouter.put('/:cid', async (req, res) => {
    let { cid } = req.params;
    const data = req.body;
    let {product, quantity} = data;
    if(!product || !quantity) return res.send({ status: "Error", error: "Incomplete values"});
    await cartModel.updateOne({_id: cid}, data);
    res.send("Cart update success");
});

cartRouter.delete('/:cid', async (req, res) => {
    let { cid } = req.params;
    await cartModel.deleteOne({_id: cid});
    res.send("Cart delete success");
});

module.exports = cartRouter;


