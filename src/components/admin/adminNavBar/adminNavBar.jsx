import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOut } from '../../../redux/actions/userActions';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom'
import { Navbar, Button } from 'reactstrap'
import './adminNavBar.css';


export function AdminNavBar() {

    const dispatch = useDispatch()
    const history = useHistory();
    const location = useLocation();

    function handleSignOut(e) {
        e.preventDefault(e)
        dispatch(signOut())
        history.push('/')
    }




    return <div className='adminNavBarContainer'>
            <div className='adminNavBarUp'>
                <img className='adminNavBarIcon' src='./images/LogoNegro.png' alt='logo'/>
            </div>
            <div className='adminNavBarUpRight'>
                <Button className='buttonAdminNav' >ADMINISTRADOR</Button>
                <Button className='buttonAdminClose' onClick={(e) => handleSignOut(e)}>CERRAR SESION</Button>
            </div>
            <div>
                
        <Navbar
            expand="md"
            className='navBar'
        >
           

            <nav className='navBarButtons' >
                
                <Link to='/admin'>
                    <Button className={`${location.pathname==="/admin" ? "activeNavTernary" : "buttons"}`}>LISTA DE USUARIOS</Button>
                </Link>
                <Link to='/admin/photos'>
                    <Button className={`${location.pathname==="/admin/photos" ? "activeNavTernary" : "buttons"}`} >FOTOS</Button>
                </Link>
                <Link to='/admin/photosView'>
                    <Button className={`${location.pathname==="/admin/photosView" ? "activeNavTernary" : "buttons"}`} >VER FOTOS</Button>
                </Link>
                <Link to='/admin/excursions'>
                    <Button className={`${location.pathname==="/admin/excursions" ? "activeNavTernary" : "buttons"}`}>EXCURSIONES</Button>
                </Link>
                <Link to='/admin/coordinators'>
                    <Button className={`${location.pathname==="/admin/coordinators" ? "activeNavTernary" : "buttons"}`} >COORDINADORES</Button>
                </Link>
                <Link to='/admin/enterprises'>
                    <Button className={`${location.pathname==="/admin/enterprises" ? "activeNavTernary" : "buttons"}`} >EMPRESAS</Button>
                </Link>

            </nav>
        </Navbar>
        <hr className='navBarDivider'></hr>
        </div>
    </div >

}