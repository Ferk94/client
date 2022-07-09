import './searchBar.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Button, Form } from "reactstrap";
import { getUsers, searchUserEnterprise, searchUsers, searchUserCoordinator } from '../../../../redux/actions/userActions';

export function SearchBar() {

    const [generalSearch, setGeneralSearch] = useState("")
    const [selectValue, setSelectValue] = useState("name")

    const dispatch = useDispatch();


    // function handleChangeName(e) {
    //     e.preventDefault();
    //     setNameSearch(e.target.value)
    // }

    // function handleSearchName(e) {
    //     e.preventDefault();
    //     if (nameSearch === "") {
    //         dispatch(getUsers())
    //     } else {
    //         dispatch(searchUsers(nameSearch));
    //     }

    //     setNameSearch('');
    //     document.getElementById("search").value = null;
    // }

    // function handleChangeEnterprise(e) {
    //     e.preventDefault();
    //     setEnterpriseSearch(e.target.value)
    // }

    // function handleSearchEnterprise(e) {
    //     e.preventDefault();
    //     if (enterpriseSearch === "") {
    //         dispatch(getUsers())
    //     } else {
    //         dispatch(searchUserEnterprise(enterpriseSearch));
    //     }

    //     setEnterpriseSearch('');
    //     document.getElementById("enterpriseSearch").value = null;
    // }

    // function handleChangeCoordinator(e) {
    //     e.preventDefault();
    //     setCoordinatorSearch(e.target.value)
    // }

    // function handleSearchCoordinator(e) {
    //     e.preventDefault();
    //     if (coordinatorSearch === "") {
    //         dispatch(getUsers())
    //     } else {
    //         dispatch(searchUserCoordinator(coordinatorSearch));
    //     }

    //     setCoordinatorSearch('');
    //     document.getElementById("coordinatorSearch").value = null;
    // }
    function selectOrder(e) {
        e.preventDefault();
        setSelectValue(e.target.value)

    }

    function handleGeneralChange(e){
        e.preventDefault();
        setGeneralSearch(e.target.value)
    }

    function handleGeneralSearch(e){
        e.preventDefault();
        if(generalSearch === ""){
            dispatch(getUsers())
        }
        if(selectValue === "name"){
            dispatch(searchUsers(generalSearch));
            document.getElementById("search").value = null;
        }
        if(selectValue === "enterprise"){
            dispatch(searchUserEnterprise(generalSearch));
            document.getElementById("search").value = null;
        }
        if(selectValue === "coordinator"){
            dispatch(searchUserCoordinator(generalSearch));
            document.getElementById("search").value = null;
        }
        document.getElementById("search").value = null;

    }





    return <div className='searchBarContainer'>
        {/* <Label>Buscar usuario o filtrar por empresa</Label> */}
        <Form className='searchBar-form'>
            <Input style={{width: "150px", boxShadow: "-3px 4px 5px 0px #989898b2", fontSize:"12px", fontFamily: 'Fredoka'}} className='inputSelectSearch' type='select' onChange={e => selectOrder(e)}>
                        <option class="mystyle" value='name'>Nombre</option>
                        <option class="mystyle" value="enterprise">Empresa</option>
                        <option class="mystyle" value="coordinator">Coordinador</option>
                    </Input>
            <Input style={{ boxShadow: "-3px 4px 5px 0px #989898b2",fontFamily: 'Fredoka', fontSize:"12px"}} id="search" className='inputSearch' type='text' placeholder='Escribir aquí' onChange={e => handleGeneralChange(e)}></Input>
            <Button id='name' type='submit' onClick={e => handleGeneralSearch(e)} style={{borderRadius: "30px",fontSize: "11px",fontWeight:"bold",fontFamily: 'Fredoka',letterSpacing:"1px",border: "1px solid #5939fa" ,backgroundColor: "#5939fa" ,height: "35px", width: "290px", boxShadow: "0px 3px 5px 0px #989898b2"}} className='btn-search'>Buscar</Button>
        </Form>
        {/* <Form className='searchBar-form'>
            <Input id='enterpriseSearch' className='input-searchBar' type='text' placeholder='Filtrar nombre de la Empresa...' onChange={e => handleChangeEnterprise(e)}> </Input>
            <Button id='enterprise' type='submit' onClick={e => handleSearchEnterprise(e)} color='primary' className='btn-search'>Filtrar</Button>
        </Form>
        <Form className='searchBar-form'>
            <Input id='coordinatorSearch' className='input-searchBar' type='text' placeholder='Filtrar nombre del Coordinador...' onChange={e => handleChangeCoordinator(e)}> </Input>
            <Button id='coordinator' type='submit' onClick={e => handleSearchCoordinator(e)} color='primary' className='btn-search'>Filtrar</Button>
        </Form> */}
    </div>
}