const express = require("express");
const mainRouter = require("./routes/index")
const app = express();

app.use("/api/v1", mainRouter );

//all the version one requests gonna go to main router
  

 




