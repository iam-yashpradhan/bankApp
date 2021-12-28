const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.options = {
  client: 'mysql',
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB
  }
};

exports.verify = function(req, res, next){
    let accessToken = req.headers.authorization;
    //console.log(accessToken);
    if (!accessToken){
        return res.status(403).send();
    }
    let payload;
    try{
        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        next();
    }
    catch(e){
        console.log(e);
        return res.status(401).send("error");
    }
}