import React,{Component} from 'react';
import { Form, Button } from 'react-bootstrap';
import { validateFields } from '../utils/utilities';
import {Link} from 'react-router-dom';

class Register extends Component {
  state = {
    typeOf: '1',
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    cpassword: '',
    successMsg: '',
    errorMsg: '',
    isSubmitted: false
  }
  

  registerUser = (event) => {
    event.preventDefault();
    const { typeOf, first_name, last_name, username, password, cpassword } = this.state;

    const fieldsToValidate = [
      { first_name },
      { last_name },
      { username },
      { password },
      { cpassword }
    ];

    const allFieldsEntered = validateFields(fieldsToValidate);
    if (!allFieldsEntered) {
      alert("Please enter all fields.");
    } else {
      if (password !== cpassword) {
        alert("Password and confirm password do not match");
      } else {
        //console.log("11");
        const data={typeOf,first_name,last_name,username,password};
        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
      //console.log("22");
      fetch("http://localhost:9000/register",requestOptions).then(res=>res.text())
      .then(res=>{
        if(res==="success"){
          this.setState({isSubmitted:true,successMsg:res});
          alert(res);
          this.props.history.push('/login');
        }else{
          alert("error");
        }
      });
      }
  }}

  handleInputChange = (event) => {
    console.log(event.target.value);
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div>
      <Link to="/">Back to home</Link>
        <h2>Register User</h2>
        <div>
          <Form onSubmit={this.registerUser}>
            <Form.Group controlId="first_name">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                placeholder="Enter first name"
                onChange={this.handleInputChange}
              />
              </Form.Group>
            <Form.Group controlId="last_name">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                placeholder="Enter last name"
                onChange={this.handleInputChange}
              />
              </Form.Group>
              <Form.Group controlId="typeOf">
            <Form.Label>Select type of User</Form.Label>
              <Form.Control name="typeOf" as="select" custom onChange={this.handleInputChange}>
              <option value="1">Customer</option>
              <option value="0">Banker</option>
            </Form.Control>
            </Form.Group>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Set up your username"
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
            <Form.Group controlId="cpassword">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                name="cpassword"
                placeholder="Enter confirm password"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <div className="action-items">
              <Button variant="primary" type="submit">
                Register
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default Register;