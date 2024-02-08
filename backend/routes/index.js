const express  = require('express');
const router   = express.Router();
const userRouter = require("./user")
const accountRouter = require("./accounts");




//further app/v1/users can go ahead tp userRouter

router.use("/user", userRouter);
router.use("/account", accountRouter )

module.exports = router;