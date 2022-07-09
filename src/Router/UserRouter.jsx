import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserPhotos } from '../components/user/userPhotos/userPhotos';


function RouteUser() {

  
  const userInfo = useSelector((state) => state.updateUserInfo.userInfo)

  return (
    <>
      {userInfo?.role === 'user'}

      <Switch>
        <Route exact path="/user">
          <UserPhotos userInfo={userInfo} />
        </Route>
      </Switch>
    </>
  );
}

export default RouteUser;