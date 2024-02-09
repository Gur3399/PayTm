const express = require("express");
const mainRouter = require("./routes/index")
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json())

app.use("/api/v1", mainRouter );

//all the version one requests gonna go to main router

app.listen(3000, ()=>{
    console.log("app is listening on port:3000")
});
  

 




