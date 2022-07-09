

import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import RouteAdmin from './Router/AdminRouter';
import RouteUser from './Router/UserRouter';
import { AuthUser } from './components/authUser/authUser';
import Register from './components/register/register';
import LogIn from './components/login/login';
import LandingPage from './components/landingPage/landingPage';




function App() {


  return (
    <Router>
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/login" component={LogIn}/>
      <Route path="/user" component={RouteUser} />
      <Route path="/admin" component={RouteAdmin} />
      <Route path="/auth">
        <AuthUser roleUser="user" roleAdmin="admin" />
      </Route>
    </Router>
  );
}

export default App;
