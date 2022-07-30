import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getUsers } from "../../../redux/actions/userActions";
import {UserModal} from './userModal/userModal.jsx';
import { AceptedModal } from './userModal/aceptedModal.jsx';
import './usersGrid.css';
import { Table} from 'reactstrap'
import { SearchBar } from "./searchBar/searchBar";


export function UsersGrid({ adminInfo, token }) {
    const dispatch = useDispatch();
    const users = useSelector(state => state?.getDataInfo?.users);


    useEffect(() => {
        dispatch(getUsers())

    }, [dispatch])

   

    // function selectOrder(e) {
    //     e.preventDefault();
    //     setOrderType(e.target.value)

    // }

    // function orderClick(e) {
    //     e.preventDefault();
    //     dispatch(orderUsersById(orderType))
    // }

  

    function handleRefresh(e) {
        e.preventDefault();
        dispatch(getUsers())

    }




    return (
        <div className='usersGridComponent'>
                
            
            <nav className='div-select'>

                <SearchBar id='searchBar' />

                <div className='div-select'>
                    <img className="refreshIcon" onClick={e => handleRefresh(e)} alt="Refresh" src="./images/iconRefresh.png" />
                </div>
            </nav>

            <Table size="md" className='userGridTable ' >
                <thead className="gridTitles">
                    <th >Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Contraseña</th>
                    <th>Coordinador</th>
                    <th>Empresa</th>
                    
                </thead>
                <tbody>
                    {users.map((e) => (

                        <tr className={`invidivualGrid${e.id%2}`} key={e.id}>

                            <td>{e.name}</td> 
                            <td>{e.email}</td>
                            <td>{e.phoneNumber}</td>
                            <td>{e.password}</td>
                            <td>{e.coordinator}</td>
                            <td>{e.enterprise}</td>
                            <td><AceptedModal value={e}></AceptedModal></td>
                            <td><UserModal value={e}></UserModal></td>
                        </tr>

                    ))}
                </tbody>
             

                <thead className="gridTitlesFooter">
                    <th>  </th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    
                </thead>




            </Table>
        </div >
    )
}