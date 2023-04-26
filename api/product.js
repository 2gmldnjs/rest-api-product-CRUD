const router = require('express').Router();
const productController = require('./_controller/productController');


// create
router.post("/", async (req, res) => {
    const result = await productController.create(req);
    res.json(result);
    });


// list
router.get('/', async (req,res)=>{
    const result = await productController.list(req);
    res.json(result);
})


// update
router.put('/:id', async (req,res)=>{
    const result = await productController.update(req);
    res.json(result);
})

// delete
router.delete('/:id', async (req,res)=>{
    const result = await productController.delete(req);
    res.json(result);
})

// truncate
router.post('/reset', async (req,res)=>{
    const result = await productController.reset(req);
    res.json(result);
})

//dummy insert
router.post('/dummy', async (req,res)=>{
    const result = await productController.dummy(req);
    res.json(result);
})

module.exports = router;