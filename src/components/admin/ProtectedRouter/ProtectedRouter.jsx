




import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';


export const ProtectedRoute = (props) => {
  const { userInfo } = useSelector(
    (state) => state.updateUserInfo
  );

  let redirectPath = '/';

  if (userInfo?.email && !userInfo.role?.includes(props.role))
    redirectPath = props.homePath;
  if (userInfo?.email && userInfo.role?.includes(props.role))
    redirectPath = props.path;

  if (redirectPath !== '/admin') {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  } else {
    return <Route {...props} />;
  }
};

export default ProtectedRoute;