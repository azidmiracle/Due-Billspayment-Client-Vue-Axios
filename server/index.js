const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors")

const app=express()

//middleware

app.use(cors())
//process.env.NODE_ENV !== "prod" && app.use(morgan("dev"))
app.use(bodyParser.json())

//for due lists
const dueLists=require("./routes/api/dueLists.route");
app.use('/api/dueLists',dueLists)

//for users
const users=require("./routes/api/users");
app.use('/api/users',users)


const port =process.env.PORT || 5000

app.listen(port,()=>console.log(`server started on ${port}`))