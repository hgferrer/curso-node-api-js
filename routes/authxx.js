
const express = require("express");

const router = express.Router();
const { validatorRegister, validatorLogin } = require("../validators/auth");
const { loginCtrl, registerCtrl } = require("../controllers/auth");


/**Route register new user */
router.post("/register", validatorRegister, registerCtrl);

router.post("/login", validatorLogin, loginCtrl);



module.exports = router;
//////////////////////////////////////////////////////////
