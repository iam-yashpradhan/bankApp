import React, {Component} from 'react';
import {Alert} from 'react-bootstrap';

class TransactionList extends Component{
	state={
		transactions:[],
	}

	componentDidMount(props){
		const reqOp = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem('token')}
    	};
		let uri="http://localhost:9000/transactions?username="+this.props.username;
		fetch(uri,reqOp).then(res=>res.json()).then(res=>{
			this.setState({transactions:res});
			console.log(this.state.transactions);
		});
	}
	render(){
		return(
			<div>
				<h1>List of transactions for user: {this.props.username}</h1>
					{this.state.transactions.map(t=>
						<Alert variant="primary" key={t.transactionId}>
						<div>
							<Alert.Heading>Transaction Id: {t.transactionId}</Alert.Heading>
							<p>Closing Balance: {t.balance}</p>
							<p>Added: {t.added}</p>
							<p>Withdrawn: {t.withdrawn}</p>
							<p>Transaction Date and Time: {t.transDT}</p>
							<br></br>
						</div>
						</Alert>
					)}
			</div>
		)
	}
}

export default TransactionList;