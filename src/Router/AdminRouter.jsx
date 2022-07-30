import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AdminNavBar } from '../components/admin/adminNavBar/adminNavBar';
import { useSelector } from 'react-redux';
import { UsersGrid } from '../components/admin/usersGrid/usersGrid';
import { AdminPhotos } from '../components/admin/adminPhotos/adminPhotos';
import { AdminPhotosView } from '../components/admin/adminPhotosView/adminPhotosView';
import { AdminCoordinators } from '../components/admin/adminCoordinators/adminCoordinators';
import { AdminEnterprises } from '../components/admin/adminEnterprises/adminEnterprises';
import { AdminExcursions } from '../components/admin/adminExcursions/adminExcursions';

function RouteAdmin(props) {
  const { userInfo, token } = useSelector(
    (state) => state?.updateUserInfo
  );
  
  return (
    <>
      {userInfo?.role === 'admin'  }
      <AdminNavBar />
      <Switch>
        <Route exact path='/admin'>
          {token ?<UsersGrid/> : <Redirect to='login'/>}
        </Route>
        <Route exact path='/admin/photos'>
          {token ? <AdminPhotos/> : <Redirect to='/login'/>}
        </Route>
        <Route exact path='/admin/photosView'>
          {token ? <AdminPhotosView/> : <Redirect to='/login'/>}
        </Route>
        <Route exact path='/admin/coordinators'>
          {token ? <AdminCoordinators/> : <Redirect to='/login'/>}
        </Route>
        <Route exact path='/admin/enterprises'>
          {token ? <AdminEnterprises/> : <Redirect to='/login'/>}
        </Route>
        <Route exact path='/admin/excursions'>
          {token ? <AdminExcursions/> : <Redirect to='/login'/>}
        </Route>
      </Switch>
    </>
  );
}

export default RouteAdmin;