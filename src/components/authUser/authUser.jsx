import "./authUser.css"
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuthUserModal } from './authUserModal';



export const AuthUser = (props) => {
  const userInfo = useSelector(
    (state) => state?.updateUserInfo?.userInfo
  );


  



  // function validInfo() {
  //   if (infoValid === 500) {
  //     alert('email o contraseña incorrectas')
  //     dispatch(clearInfoValid())
  //     setRedirect(true)
  //   }
  // }   


  if (userInfo?.email && userInfo.role?.includes(props.roleUser)){ 
    return <Redirect to="/user" />;
  }
  if (userInfo?.email && userInfo.role?.includes(props.roleAdmin)){  
    return <Redirect to="/admin" />;
  }

  //comprobaciones q por ahora no se van a borrar en primera demo:
  // if(!userInfo?.email || !userInfo?.role || infoValid === 404 || infoValid === 500){

  //   return <AuthUserModal infoValid={infoValid}/>
  // }
  return <div className="authUserModalContainer"><AuthUserModal /></div>
  // if (!userInfo?.email) {
  //   if (redirect === false) {
  //     setTimeout(validInfo, 2000)
  //     return <></>;
  //   }
  //   if (redirect === true) {
  //     return <Redirect to="/login" />
  //   }
  // }

}