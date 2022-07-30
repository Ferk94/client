import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserPhotos } from '../components/user/userPhotos/userPhotos';


function RouteUser() {

  
  const {userInfo, token} = useSelector(
    (state) => state?.updateUserInfo
    );

  return (
    <>
      {userInfo?.role === 'user'}

      <Switch>
        <Route exact path="/user">
          { token ? <UserPhotos userInfo={userInfo}/> : <Redirect to='/login'/>}
        </Route>
      </Switch>
    </>
  );
}

export default RouteUser;