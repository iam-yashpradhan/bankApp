var express = require('express');
var router = express.Router();
var bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
var {verify,options} = require('../middleware');
var knex = require('knex')(options);

require('dotenv').config();

router.post('/',async function(req, res, next) {
  const usr=req.body.username;
  const pass=req.body.password;
  knex.from('users').select('pass','user_type').where({userName:usr})
  .then(async rows=>{
    if(!rows || !rows[0]){
      res.send("Invalid username");
    }else{
      const b=await bcrypt.compare(pass,rows[0].pass).then(b=>b);
      //console.log(b);
    if(b){
      let payload = {username: usr};
      if(rows[0].user_type==0){
        payload.usertype='0';
      }else{
        payload.usertype='1';
      }
      //console.log(payload);
      let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS384",
        expiresIn: process.env.ACCESS_TOKEN_LIFE
    });
      //console.log(accessToken);
    res.json(accessToken);
    res.send();
      
    }else{
      res.send("Incorrect Pass");
    }}
});
});

module.exports = router;