import React, {Component} from 'react';
import { Button, Alert } from 'react-bootstrap';
import TransactionList from './TransactionList';
import withAuth from "../utils/withAuth";
import {Link} from 'react-router-dom';

class UserList extends Component{
	state={
		users:[],
		balances:'',
		toShow:false,
		user:'',
	}

	componentDidMount(){
		const reqOp = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem('token')}
    	};
		let uri="http://localhost:9000/users";
		fetch(uri,reqOp).then(res=>res.json()).then(res=>{
			console.log(res);
			this.setState({users:res})}).catch(er=>alert(er));
	}

	show=async(usr)=>{
        const reqOp = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem('token')}
    	};
        await fetch("http://localhost:9000/viewbal?username="+usr,reqOp).then(res=>res.text()).then(res=>
            this.setState({toShow:true,user:usr,balances:res}));
        console.log("done");
		
	}

	render(){
		let trs='';
		if(this.state.toShow){
            
			trs=<div><h2>Balance: {this.state.balances}</h2>
			<TransactionList key={this.state.user} username={this.state.user}/></div>;
		}
		return(
			<div>
			<Link to="/">Back to home</Link>
				<h1>Banker View</h1>
				<h3>List of Customers</h3>
				{this.state.users.map((u,i)=>
					<Alert variant="dark" key={u.userId}>
					<div>
						<p>First name: {u.firstName}</p>
						<p>Last name: {u.lastName}</p>
						<p>Username: {u.userName}</p>
						<p>user Id: {u.userID}</p>
						<Button onClick={()=>this.show(u.userName)}>Show Transactions and Balance</Button>
					</div>
					</Alert>
				)}
				{trs}
			</div>
	)}	
}

export default withAuth(UserList);