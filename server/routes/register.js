var express = require('express');
var router = express.Router();
var bcrypt = require("bcryptjs");
var {options} = require('../middleware');
var knex = require('knex')(options);

require('dotenv').config();

router.post('/', async function(req, res, next) {
	//console.log(req.body);
	// knex.from('users').select("*").then((rows)=>{});
	let pass=req.body.password;
	pass=await bcrypt.hash(pass, 8).then(p=>p);
	//console.log(pass);
	const user={user_type: parseInt(req.body.typeOf),
	 firstName: req.body.first_name, 
	 lastName:req.body.last_name,
	 userName:req.body.username,
	 pass:pass
	}
	const usr=req.body.username;
	const init={balance: 0, username: usr};
	if(parseInt(req.body.typeOf)===1){
		knex('users').insert(user).asCallback(function(err) {
    if (err) {
       res.send(err);
    } else {
		knex('accounts').insert(init).then(res.send("success"));
    }
})
	}else{
		knex('users').insert(user).asCallback(function(err) {
			if(err){res.send(err);}else{res.send("success");}
		});
	}
});

module.exports = router;