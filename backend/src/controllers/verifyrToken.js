const config = require('../config')
// JsonWebToken
const jwt = require('jsonwebtoken');

async function verifyToken(req, res, next){

  const token = req.headers['x-access-token'];    
  try{
    if(!token){
      return res.status(401).send({ meesage: 'No token provided'})
    }

    const decodedToken = await jwt.verify(token, config.secret);
    req.userID = decodedToken.id;
    next();
  } catch(e){
    res.status(400).send({message: 'Invalid token'})
  }
}

module.exports = verifyToken;