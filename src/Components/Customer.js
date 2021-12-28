import React,{Component} from 'react';
import TransactionList from './TransactionList';
import Transact from './Transact';
import {Button} from 'react-bootstrap';
import withAuth from "../utils/withAuth";
import {Link,withRouter} from 'react-router-dom';

class Customer extends Component{

	state={
		toShow:false,
		x:0
	}
	show=()=>{
		let x=Math.random();
		this.setState({toShow:true,x:x});
	}

	render(){
		let tr='';
		if(this.state.toShow){
			tr=<TransactionList key={this.state.x} username={this.props.location.state.username}/>
		}
		return(
			<div>
			<Link to="/">Back to home</Link>
				<Transact username={this.props.location.state.username}/>
				<Button variant="primary" onClick={this.show}>Show Transactions</Button>
				{tr}
			</div>
		)
	}
}
export default withAuth(withRouter(Customer));