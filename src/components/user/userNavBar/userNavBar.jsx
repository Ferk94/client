import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOut } from '../../../redux/actions/userActions';
import { useHistory } from 'react-router';
import { Navbar, NavbarBrand, Button } from 'reactstrap'

export function UserNavBar() {

    const dispatch = useDispatch();
    const history = useHistory();

    function handleSignOut(e) {
        e.preventDefault()
        dispatch(signOut())
        history.push('/')

    }


    return <div >
        <Navbar
            color="dark"
            expand="md"
            
        >
           

            <div className="button-container">
                <Link to="/user">
                    <Button  className='buttons'>Home</Button>
                </Link>
                <Link to="/user/profile">
                    <Button className='buttons'>Perfil</Button>
                </Link>
                <Link to="/user/photos">
                    <Button className='buttons'>Fotos</Button>
                </Link>
                <Button  className='buttons' onClick={(e) => handleSignOut(e)}>Salir</Button>

            </div>
        </Navbar>
    </div>
}