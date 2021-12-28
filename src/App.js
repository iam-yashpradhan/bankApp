import React, {Component} from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import UserList from './Components/UserList';
import Customer from './Components/Customer';

class App extends Component {
render(){
  return (
    <BrowserRouter>
    <div style={{margin:"35px"}}>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
  		<Route path="/login" exact component={Login} />
  		<Route path="/banker" exact component={UserList} />
  		<Route path="/customer" exact component={Customer} />
    </div>
    
    </BrowserRouter>
  );
}
  
}

export default App;