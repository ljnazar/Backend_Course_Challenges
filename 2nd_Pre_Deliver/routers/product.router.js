const { Router } = require('express');
const productModel = require('../models/product.model');

const productRouter = Router();

productRouter.get('/', async (req, res) => {

    const { limit, page, sort, query } = req.query

    console.log(limit);
    console.log(page);
    console.log(sort);
    console.log(query);

    try{
        //let products = await productModel.find();
        let products = await productModel.paginate( {title: query}, {limit: limit , page: page});
        //let products = await productModel.paginate( {title: query}, {limit: limit , page: page, sort: { _id: 1, createdAt: -1 }});
        //res.render('products', { data: products });
        res.send(products);
    }
    catch(error){
        console.log(`Cannot get products with mongoose ${error}`);
    }
});

productRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        let product = await productModel.find({_id: id});
        //res.render('products', { data: product });
        res.send(product);
    }
    catch(error){
        console.log(`Cannot get product with mongoose ${error}`);
    }
});

productRouter.post('/', async (req, res) => {
    const data = req.body;
    let {title, description, price, thumbnail, code, stock } = data;
    if(!title || !description || !price || !thumbnail || !code || !stock) return res.send({ status: "Error", error: "Incomplete values"});
    try{
        await productModel.create({
            title, 
            description,
            price, 
            thumbnail, 
            code, 
            stock
        });
    }
    catch(error){
        console.log(`Cannot send product to mongoose ${error}`);
    }
});

productRouter.put('/:id', async (req, res) => {
    let { id } = req.params;
    const data = req.body;
    let {title, description, price, thumbnail, code, stock } = data;
    if(!title || !description || !price || !thumbnail || !code || !stock) return res.send({ status: "Error", error: "Incomplete values"});
    await productModel.updateOne({_id: id}, data);
});

productRouter.delete('/:id', async (req, res) => {
    let { id } = req.params;
    await productModel.deleteOne({_id: id});
});

module.exports = productRouter;


