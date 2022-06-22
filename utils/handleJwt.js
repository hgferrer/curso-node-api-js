const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const getProperties = require("../utils/handlePropertiesEngine");
const propertiesKey = getProperties();

/**Debes de pasar el objeto del usuario */
const tokenSign = async (user) => {
const sign = jwt.sign(
    {
        [propertiesKey.id]: user[propertiesKey.id],
        role: user.role
    },
    JWT_SECRET,
    {
        expiresIn:"2h"
    }
);
  return sign
};


/**debes de pasar el token de seccion el JWT */
const verifyToken = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET)
    } catch (e) {
        return null
    }

}


module.exports = {tokenSign, verifyToken }