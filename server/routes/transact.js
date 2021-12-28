var express = require('express');
var router = express.Router();
var {verify,options} = require('../middleware');

var knex = require('knex')(options);


router.get("/",verify,function(req, res, next) {
	const user=req.query.username;
	const amt=parseInt(req.query.amount);
	const type=req.query.type;
	//console.log(amt);
	knex.from('accounts').select('balance').where({username:user}).orderBy('transDT','desc')
	.then(row=>{
		let bal=parseInt(row[0].balance);
		if(type=='add'){
			bal+=amt;
			const data={balance:bal,added:amt,username:user}
			knex('accounts').insert(data).then(res.send(bal.toString()));
	}else{
		bal-=amt;
		const data={balance:bal,withdrawn:amt,username:user}
		knex('accounts').insert(data).then(res.send(bal.toString()));
	}
});
});

module.exports = router;