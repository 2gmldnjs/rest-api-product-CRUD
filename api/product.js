//라우터 모튤화
const router = require('express').Router(); //express모듈에 있는 Router 사용
const productController = require('./_controller/productController');

//CRUD 함수

// create
router.post("/", async (req, res) => {
    console.log('create1');
    const result = await productController.create(req);
    console.log('create2',result);
    res.json(result); 
    /*result ex
        create2 {
        status: 200,
        message: 'Success',
        resDate: '2023-04-26 16:47:10',
        data: undefined
        }
    */
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

//dummy insert, truncate
router.post('/dummy', async (req,res)=>{
    const result = await productController.dummy(req);
    res.json(result);
})

module.exports = router;