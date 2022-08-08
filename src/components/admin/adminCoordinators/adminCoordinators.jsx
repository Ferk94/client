import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postCoordinator,
  getCoordinators,
  getCoordinatorsByEnterpriseId,
} from "../../../redux/actions/coordinatorsActions";
import { getEnterprises } from "../../../redux/actions/enterprisesActions";
import { Button, Table, Input, Form } from "reactstrap";
import "./adminCoordinators.css";
import { CoordinatorsModal } from "./coordinatorsModal/coordinatorsModal.jsx";
import Swal from 'sweetalert2'

export function AdminCoordinators() {
  const initialState = { name: "", dropboxCel: "", dropboxPc: ""};

  const [coordinator, setCoordinator] = useState(initialState);
  const [EnterpriseId, setEnterpriseId] = useState(null);
  const dispatch = useDispatch();
  const coordinators = useSelector(
    (state) => state.getDataInfo.coordinatorsByEnterprise
  );
  const enterprises = useSelector((state) => state.getDataInfo.enterprises);
  
  useEffect(() => {
    dispatch(getEnterprises());
    dispatch(getCoordinators());
  }, [dispatch]);

  function enterpriseName(id) {
    const obj = enterprises?.find((e) => e?.id === id);
    const name = obj?.name;

    return name;
  }

  const fixedCoordinators = coordinators?.map((e) => {
    return {
      id: e?.id,
      name: e?.name,
      dropboxCel: e?.dropboxCel,
      dropboxPc: e?.dropboxPc,
      enterprise: enterpriseName(e?.EnterpriseId),
    };
  });

  function handleChange(e) {
    e.preventDefault();
    setCoordinator({
      ...coordinator,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e, id) {
    e.preventDefault();
    dispatch(postCoordinator(EnterpriseId, coordinator));
    setEnterpriseId(null);
    setCoordinator(initialState);
    document.getElementById("name").value = null;
    document.getElementById("enterprises").value = null;
    Swal.fire({
      icon: 'success',
      title: 'Éxito!',
      text: 'Coordinador creado correctamente.',
    })

    dispatch(getCoordinatorsByEnterpriseId(id));
  }

  function selectEnterprise(e) {
    e.preventDefault();
    setEnterpriseId(e.target.value);
  }

  function handleClickEnterprises(e, id) {
    e.preventDefault();
    dispatch(getCoordinatorsByEnterpriseId(id));
  }


  if(enterprises?.length === 0 && fixedCoordinators.length === 0){
    return (
      <div className="adminCoordinatorsComponent">
        <Form
          className="searchBar-form"
          style={{ marginTop: "25px", marginBottom: "25px" }}
        >
          <Input
            style={{
              boxShadow: "-3px 4px 5px 0px #989898b2",
              fontFamily: "Fredoka",
              fontSize: "12px",
            }}
            className="inputSelectSearch"
            type="text"
            name="name"
            id="name"
            placeholder="Nombre y apellido"
            onChange={(e) => handleChange(e)}
          ></Input>
          <Input
            style={{
              boxShadow: "-3px 4px 5px 0px #989898b2",
              fontFamily: "Fredoka",
              fontSize: "12px",
            }}
            className="inputSelectSearch"
            type="text"
            name="dropboxCel"
            id="dropboxCel"
            placeholder="link de dropbox para celular"
            onChange={(e) => handleChange(e)}
          ></Input>
          <Input
            style={{
              boxShadow: "-3px 4px 5px 0px #989898b2",
              fontFamily: "Fredoka",
              fontSize: "12px",
            }}
            className="inputSelectSearch"
            type="text"
            name="dropboxPc"
            id="dropboxPc"
            placeholder="link de dropbox para Pc"
            onChange={(e) => handleChange(e)}
          ></Input>
          <Input
            style={{
              width: "200px",
              boxShadow: "-3px 4px 5px 0px #989898b2",
              fontSize: "12px",
              fontFamily: "Fredoka",
            }}
            className="inputSelectSearch"
            type="select"
            name="enterprises"
            id="enterprises"
            onChange={(e) => selectEnterprise(e)}
          >
            
            <option class="mystyle">Asocie una empresa</option>
            {enterprises.map((e) => {
              return (
                <option class="mystyle" value={e.id} key={e.id}>
                  {e.name}
                </option>
              );
            })}
          </Input>
          <Button
            style={{
              marginLeft: "5px",
              marginRight: "5px",
              borderRadius: "30px",
              fontSize: "11px",
              fontWeight: "bold",
              fontFamily: "Fredoka",
              letterSpacing: "1px",
              border: "1px solid #5939fa",
              backgroundColor: "#5939fa",
              height: "35px",
              width: "400px",
              boxShadow: "0px 3px 5px 0px #989898b2",
            }}
            type="submit"
            className="adminCoordinatorsFormButton"
            onClick={(e) => handleSubmit(e, EnterpriseId)}
          >
            Agregar coordinador
          </Button>
        </Form>
      </div>
    );
  }else if(enterprises?.length > 0 && fixedCoordinators.length === 0){
    return (
      <div className="adminCoordinatorsComponent">
        <Form
          className="searchBar-form"
          style={{ marginTop: "25px", marginBottom: "25px" }}
        >
          <Input
            style={{
              boxShadow: "-3px 4px 5px 0px #989898b2",
              fontFamily: "Fredoka",
              fontSize: "12px",
            }}
            className="inputSelectSearch"
            type="text"
            name="name"
            id="name"
            placeholder="Nombre y apellido"
            onChange={(e) => handleChange(e)}
          ></Input>
          <Input
            style={{
              boxShadow: "-3px 4px 5px 0px #989898b2",
              fontFamily: "Fredoka",
              fontSize: "12px",
            }}
            className="inputSelectSearch"
            type="text"
            name="dropboxCel"
            id="dropboxCel"
            placeholder="link de dropbox para celular"
            onChange={(e) => handleChange(e)}
          ></Input>
          <Input
            style={{
              boxShadow: "-3px 4px 5px 0px #989898b2",
              fontFamily: "Fredoka",
              fontSize: "12px",
            }}
            className="inputSelectSearch"
            type="text"
            name="dropboxPc"
            id="dropboxPc"
            placeholder="link de dropbox para Pc"
            onChange={(e) => handleChange(e)}
          ></Input>
          <Input
            style={{
              width: "200px",
              boxShadow: "-3px 4px 5px 0px #989898b2",
              fontSize: "12px",
              fontFamily: "Fredoka",
            }}
            className="inputSelectSearch"
            type="select"
            name="enterprises"
            id="enterprises"
            onChange={(e) => selectEnterprise(e)}
          >
            
            <option class="mystyle">Asocie una empresa</option>
            {enterprises.map((e) => {
              return (
                <option class="mystyle" value={e.id} key={e.id}>
                  {e.name}
                </option>
              );
            })}
          </Input>
          <Button
            style={{
              marginLeft: "5px",
              marginRight: "5px",
              borderRadius: "30px",
              fontSize: "11px",
              fontWeight: "bold",
              fontFamily: "Fredoka",
              letterSpacing: "1px",
              border: "1px solid #5939fa",
              backgroundColor: "#5939fa",
              height: "35px",
              width: "400px",
              boxShadow: "0px 3px 5px 0px #989898b2",
            }}
            type="submit"
            className="adminCoordinatorsFormButton"
            onClick={(e) => handleSubmit(e, EnterpriseId)}
          >
            Agregar coordinador
          </Button>
        </Form>
        <div className="div-enterprises">
          {enterprises.map((e) => {
            return (
              <div>
                <Button
                  className="buttonsCoordinators"
                  onClick={(event) => handleClickEnterprises(event, e.id)}
                >
                  {e.name}
                </Button>
              </div>
            );
          })}
        </div>
        <h1>No Hay Coordinadores creados para la empresa seleccionada</h1>
      </div>
    ); 
  }else {
    return (
      <div className="adminCoordinatorsComponent">
        <Form
          className="searchBar-form"
          style={{ marginTop: "25px", marginBottom: "25px" }}
        >
          <Input
            style={{
              boxShadow: "-3px 4px 5px 0px #989898b2",
              fontFamily: "Fredoka",
              fontSize: "12px",
            }}
            className="inputSelectSearch"
            type="text"
            name="name"
            id="name"
            placeholder="Nombre y apellido"
            onChange={(e) => handleChange(e)}
          ></Input>
          <Input
            style={{
              boxShadow: "-3px 4px 5px 0px #989898b2",
              fontFamily: "Fredoka",
              fontSize: "12px",
            }}
            className="inputSelectSearch"
            type="text"
            name="dropboxCel"
            id="dropboxCel"
            placeholder="link de dropbox para celular"
            onChange={(e) => handleChange(e)}
          ></Input>
          <Input
            style={{
              boxShadow: "-3px 4px 5px 0px #989898b2",
              fontFamily: "Fredoka",
              fontSize: "12px",
            }}
            className="inputSelectSearch"
            type="text"
            name="dropboxPc"
            id="dropboxPc"
            placeholder="link de dropbox para Pc"
            onChange={(e) => handleChange(e)}
          ></Input>
          <Input
            style={{
              width: "200px",
              boxShadow: "-3px 4px 5px 0px #989898b2",
              fontSize: "12px",
              fontFamily: "Fredoka",
            }}
            className="inputSelectSearch"
            type="select"
            name="enterprises"
            id="enterprises"
            onChange={(e) => selectEnterprise(e)}
          >
            
            <option class="mystyle">Asocie una empresa</option>
            {enterprises.map((e) => {
              return (
                <option class="mystyle" value={e.id} key={e.id}>
                  {e.name}
                </option>
              );
            })}
          </Input>
          <Button
            style={{
              marginLeft: "5px",
              marginRight: "5px",
              borderRadius: "30px",
              fontSize: "11px",
              fontWeight: "bold",
              fontFamily: "Fredoka",
              letterSpacing: "1px",
              border: "1px solid #5939fa",
              backgroundColor: "#5939fa",
              height: "35px",
              width: "400px",
              boxShadow: "0px 3px 5px 0px #989898b2",
            }}
            type="submit"
            className="adminCoordinatorsFormButton"
            onClick={(e) => handleSubmit(e, EnterpriseId)}
          >
            Agregar coordinador
          </Button>
        </Form>
        <div className="div-enterprises">
          {enterprises.map((e) => {
            return (
              <div>
                <Button
                  className="buttonsCoordinators"
                  onClick={(event) => handleClickEnterprises(event, e.id)}
                >
                  {e.name}
                </Button>
              </div>
            );
          })}
        </div>
  
        <Table size="md" className="userGridTableCoordinators ">
          <thead className="gridTitlesCoordinators">
            <th>Nombre y Apellido</th>
            <th>Empresa</th>
            <th></th>
          </thead>
          <tbody>
            {fixedCoordinators?.map((c) => {
              return (
                <tr
                  className={`invidivualGridCoordinators${c.id % 2}`}
                  key={c.id}
                >
                  <td>{c.name}</td>
                  <td>{c.enterprise}</td>
                  {/* <td ><Button style={{ borderRadius: "5px", width: "25px", height: "25px", display: 'flex', justifyContent: 'space-around', paddingBottom: '20px', paddingTop: '1px' }} color="danger" onClick={e => handleClose(e, c.id)} >X</Button></td> */}
                  <td></td>
                  <td></td>
                  <td style={{ userSelect: "none" }}>
                                                                                                         
                  </td>
                  <td>
                    <CoordinatorsModal value={c}></CoordinatorsModal>
                  </td>
                </tr>
              );
  
              // <div className="coordinators-admin" key={c.id}>
              //     {c.name}
              //     <br />
              //     <Button style={{ borderRadius: "5px", width: "30px", height: "30px" }} color="danger" onClick={e => handleClose(e, c.id)}>X</Button>
              // </div>
            })}
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
      </div>
    );
  }
}
