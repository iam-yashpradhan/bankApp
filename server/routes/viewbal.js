var express = require('express');
var router = express.Router();
var {verify,options} = require('../middleware');

var knex = require('knex')(options);


router.get("/",verify,function(req, res, next) {
	//console.log(req.headers);
	const user=req.query.username;
	knex.from('accounts').select('balance').where({username:user}).orderBy('transDT','desc')
	.then(row=>{
		const bal=row[0].balance;
		console.log(bal);
		res.send(bal.toString());
	});
});

module.exports = router;