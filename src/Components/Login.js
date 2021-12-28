import React, {Component} from 'react';
import { Form, Button} from 'react-bootstrap';
import {validateFields} from '../utils/utilities';
import {Link} from 'react-router-dom';
import jwt from 'jwt-decode';

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    isCustomer: false,
    isBanker: false
  };
  handleLogin = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const fieldsToValidate = [{ username }, { password }];
    const allFieldsEntered = validateFields(fieldsToValidate);
    if (!allFieldsEntered) {
      	alert("Please enter all fields.");
      	this.setState({errorMsg:"less fields"});
    } else {
    	const data={username,password};
    	const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    	};
    	fetch("http://localhost:9000/login",requestOptions).then(res=>res.json())
      	.then(res=>{console.log(res);
      		const usr = jwt(res); 
      		localStorage.setItem('token', res);
      		let typ=usr.usertype;
      		let user=usr.username;
      		if(typ==='0'){
      		this.setState({isBanker:true, errorMsg:''});
      		this.props.history.push('/banker');
      	}else if(typ==='1'){
      		this.setState({isCustomer:true, errorMsg:''});
      		this.props.history.push({
      			pathname:'/customer',
      			state:{username:user}
      		});
      	}else{
      		console.log(res);
      		this.setState({errorMsg:res});
          alert("Server Error. Try Later");
      	}
      }).catch(res=>alert("Error"))
    }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div>
      <Link to="/">Back to home</Link>
        <h1>Login</h1>
        <div>
          <Form onSubmit={this.handleLogin}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <div className="action-items">
              <Button variant="primary" type="submit">
                Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;