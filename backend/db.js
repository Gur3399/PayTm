const mongoose  = require("mongoose");

mongoose.connect("mongodb+srv://gurjotsingh3399:eZsEVqQYYWbE1YNg@cluster0.0cqijvz.mongodb.net/paytm");

const userSchema = mongoose.schema({
    email:String,
    password:String,
    firstName:String,
    lastName : String
     
})

const User = mongoose.model('User',  userSchema);

module.exports ={
    User
} 