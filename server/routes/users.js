var express = require('express');
var router = express.Router();
var {verify,options} = require('../middleware');

var knex = require('knex')(options);


router.get("/",verify,function(req, res, next) {
	knex.from('users').where('user_type','1').then(rows=>{
		//console.log(rows);
		res.send(rows);
	});

});

module.exports = router;
