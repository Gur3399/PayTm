const express  = require('express');
const router   = express.Router();
const userRouter = require("./user")



//further app/v1/users can go ahead tp userRouter

router("/user", userRouter);

module.exports = router;