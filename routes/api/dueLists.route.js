const express=require("express")
const mongodb=require("mongodb")

const router=express.Router();

//GET LIST
router.get('/',async(req,res)=>{
   const lists=await loadDueListCollection();
   res.send(await lists.find({}).toArray())
})

//ADD POSTS
router.post('/',async(req,res)=>{
    const lists=await loadDueListCollection()
    await lists.insertOne({     
        username:req.body.username,
        bills_name:req.body.bills_name,
        benefeciary_name:req.body.benefeciary_name,
        frequency:req.body.frequency,
        scheduled_day:req.body.scheduled_day,
        amount:req.body.amount,
        currency:req.body.currency,
        txn:req.body.txn,
       
    });
    res.status(201).send()
})

//DELETE POSTS
router.delete('/:id',async(req,res)=>{
    const lists=await loadDueListCollection()
    await lists.deleteOne({
       _id:new mongodb.ObjectID(req.params.id)
    });
    res.status(200).send()
})


//UPDATE DETAILS
/*
router.patch('/:id',async(req,res)=>{
    const lists=await loadDueListCollection()
    /*let newvalues = { $set: { 
        bills_name:req.body.bills_name,
        benefeciary_name:req.body.benefeciary_name,
        frequency:req.body.frequency,
        scheduled_day:req.body.scheduled_day,
        amount:req.body.amount,
        currency:req.body.currency} };*/
    //await lists.update({
     //   bills_name:req.body.bills_name
    //});
   // res.status(201).send()
//})




  router.patch('/', async (req, res) => {
    const lists=await loadDueListCollection()  
        lists.findById(req.body.id)
        .then(result => {
            result.bills_name = req.body.bills_name;
        }).then(() => {
            res.send('post updated successfully');
        }).catch(err => {
            res.status(400).send(err);
        })
    
  })
  

async function loadDueListCollection(){
    const client=await mongodb.MongoClient.connect
    ('mongodb+srv://emelydiaz:1234@vue-express-mongo-rlj0q.mongodb.net/test',{
        useNewUrlParser:true
    });

    return client.db('vue-express').collection('dueLists')
}

module.exports=router