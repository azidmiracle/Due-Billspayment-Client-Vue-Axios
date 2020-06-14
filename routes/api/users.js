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
        
        text:req.body.text,
        createdAt:new Date()
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

async function loadDueListCollection(){
    const client=await mongodb.MongoClient.connect
    ('mongodb+srv://emelydiaz:1234@vue-express-mongo-rlj0q.mongodb.net/test',{
        useNewUrlParser:true
    });

    return client.db('vue-express').collection('users')
}

module.exports=router