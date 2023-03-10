const { Router } = require('express');
const productModel = require('../models/product.model');

const productRouter = Router();

productRouter.get('/', async (req, res) => {

    const { limit, page, sort, query } = req.query;

    //console.log(limit);
    //console.log(page);
    //console.log(sort);
    //console.log(query);

    let result;
    let options;

    try{
        if(query){
            if(limit) {
                options = {
                    limit: limit,
                    page: page,
                    sort: { price: sort}
                }
            }
            else {
                options = {
                    pagination: false,
                    sort: { price: sort},
                }
            }
            result = await productModel.paginate( {title: query}, options );
        }
        else{
            result = await productModel.find();
        }
    }
    catch(error){
        console.log(`Cannot get products with mongoose ${error}`);
    }
    finally{
        let resultFormatted = {
            status: 'Status code',
            payload : result.docs,
            totalResults: result.totalDocs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? 'Link-to-pre-page' : null,
            nextLink: result.hasNextPage ? 'Link-to-post-page' : null
        }
        res.send(resultFormatted);
    }
});

productRouter.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    try{
        let product = await productModel.find({_id: pid});
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
        res.send("Product create success");
    }
    catch(error){
        console.log(`Cannot send product to mongoose ${error}`);
    }
});

productRouter.put('/:pid', async (req, res) => {
    let { pid } = req.params;
    const data = req.body;
    let {title, description, price, thumbnail, code, stock } = data;
    if(!title || !description || !price || !thumbnail || !code || !stock) return res.send({ status: "Error", error: "Incomplete values"});
    await productModel.updateOne({_id: pid}, data);
    res.send("Product update success");
});

productRouter.delete('/:pid', async (req, res) => {
    let { pid } = req.params;
    await productModel.deleteOne({_id: pid});
    res.send("Product delete success");
});

module.exports = productRouter;


