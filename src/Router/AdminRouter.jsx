import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AdminNavBar } from '../components/admin/adminNavBar/adminNavBar';
import { useSelector } from 'react-redux';
import { UsersGrid } from '../components/admin/usersGrid/usersGrid';
import { AdminPhotos } from '../components/admin/adminPhotos/adminPhotos';
import { AdminPhotosView } from '../components/admin/adminPhotosView/adminPhotosView';
import { AdminCoordinators } from '../components/admin/adminCoordinators/adminCoordinators';
import { AdminEnterprises } from '../components/admin/adminEnterprises/adminEnterprises';
import { AdminExcursions } from '../components/admin/adminExcursions/adminExcursions';

function RouteAdmin(props) {
  const { userInfo } = useSelector(
    (state) => state.updateUserInfo
  );

  return (
    <>
      {userInfo?.role === 'admin'  }
      <AdminNavBar />
      <Switch>
        <Route exact path='/admin'>
          <UsersGrid adminInfo={userInfo} />
        </Route>
        <Route exact path='/admin/photos' component={AdminPhotos} />
        <Route exact path='/admin/photosView' component={AdminPhotosView}/>
        <Route exact path='/admin/coordinators' component={AdminCoordinators} />
        <Route exact path='/admin/enterprises' component={AdminEnterprises} />
        <Route exact path='/admin/excursions' component={AdminExcursions} />
      </Switch>
    </>
  );
}

export default RouteAdmin;