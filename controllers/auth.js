const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJWT");
const { handleHttpError } = require("../utils/handleError")
const { usersModel } = require("../models");

/**Este controlador es el encargado de registrar un usuario */
const registerCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password};
    const dataUser = await usersModel.create(body);
    dataUser.set("password", undefined, {strict: false});

    const data = {
        token: await tokenSign(dataUser),
        user:dataUser
    }
    res.send({data});
  } catch (e) {
    handleHttpError(res, "ERROR_REGISTER_USER")
  }
};



/** Este es el controlador encargado de logear una persona */
const loginCtrl = async (req, res) => {
try {
    req = matchedData(req);
    const user = await usersModel.findOne({email:req.email})
    //.select('password name role email');
    
    if(!user){
        handleHttpError(res, "USER_NOT_EXISTS",404); 
        return
    }

    const hashPassword = user.get('password');
    const check = await compare(req.password, hashPassword)

    if(!check){
        handleHttpError(res, "PASSWORD INVALID",401); 
        return
    }

    user.set('password', undefined, {strict:false})
    const data = {
        token:await tokenSign(user),
        user
    }

    res.send({data})

} catch (e) {
    handleHttpError(res, "ERROR_LOGIN_USER");
}
};


module.exports = {registerCtrl, loginCtrl}