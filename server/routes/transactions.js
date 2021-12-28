var express = require('express');
var router = express.Router();
var {verify,options} = require('../middleware');

var knex = require('knex')(options);


router.get("/",verify,function(req, res, next) {
	const user=req.query.username;
	knex.from('accounts').where({username:user}).then(rows=>res.send(rows));
});

module.exports = router;