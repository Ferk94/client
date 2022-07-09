import './adminExcursions.css'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCoordinatorsByEnterpriseId } from '../../../redux/actions/coordinatorsActions';
import { Button, Form, Input, Table } from 'reactstrap';
import { getExcursionsByCoordinatorId, postExcursionByCoordinatorId } from '../../../redux/actions/excursionsActions';
import { getEnterprises } from '../../../redux/actions/enterprisesActions';
import {ExuctionsModal} from './excursionsModal/excursionsModal'
import Swal from 'sweetalert2'

export function AdminExcursions() {

    const initialState = {
        name: ''
    }

    const [excursion, setExcursion] = useState(initialState)
    const [CoordinatorId, setCoordinatorId] = useState(null)
    const enterprises = useSelector(state => state?.getDataInfo?.enterprises)
    const coordinators = useSelector(state => state?.getDataInfo?.coordinatorsByEnterprise)
    const excursions = useSelector(state => state?.getDataInfo?.excursions);
    const [input, setInput] = useState(initialState);


    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getEnterprises());
    }, [dispatch])

    
    function handleChange(e) {
        e.preventDefault();
        setExcursion({
            name: e.target.value
        })
        setInput({
            name: e.target.value
        })
    }

    function addCoordinator(e){
        setCoordinatorId(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(CoordinatorId === null){
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Debe asociar un coordinador con su nueva excursión.'
              })
            document.getElementById("name").value = null;
            document.getElementById("coordinators").value = "Asocie un coordinador"
            clearInput()
            return;
        }
        if(excursion.name === ""){
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Debes ponerle un nombre a su nueva excursión.'
              })
            document.getElementById("name").value = null;
            document.getElementById("coordinators").value = "Asocie un coordinador"
            clearInput()
            return;
        }
        if(excursion.name !== "" && CoordinatorId !== null){

            dispatch(postExcursionByCoordinatorId(CoordinatorId, excursion))
            Swal.fire({
                icon: 'success',
                title: 'Éxito!',
                text: 'Se ha creado y asociado correctamente.'
              })
            document.getElementById("name").value = null;
            document.getElementById("coordinators").value = "Asocie un coordinador"
            dispatch(getExcursionsByCoordinatorId(CoordinatorId))
            clearInput()
            return;
        }

    }
    function clearInput(){
        setInput(initialState);
    }

    function handleClickEnterprises(e, id){
        e.preventDefault();
        dispatch(getCoordinatorsByEnterpriseId(id))
    }

    function handleClickCoordinators(e, id) {
        e.preventDefault();
        dispatch(getExcursionsByCoordinatorId(id))
    }

    return <div className='adminExcursions'>

        <div className='div-coordinators'>
            {
                enterprises?.map(e => {
                    return <div> 
                            <Button className='buttonsEnterprises' onClick = {event => handleClickEnterprises(event, e.id)}>{e.name}</Button>
                           </div>
                })
            }
        </div>

        <Form className='searchBar-form' style={{marginTop: "25px", marginBottom: "25px"}}>
            <Input id="name" value={input.name} name="name" placeholder='Ingresar excursion' style={{ boxShadow: "-3px 4px 5px 0px #989898b2",fontFamily: 'Fredoka', fontSize:"12px"}} className='inputSelectSearch' type="text" onChange={e => handleChange(e)}></Input>
            <Input  type='select' name="coordinators" id="coordinators" style={{width: "200px", boxShadow: "-3px 4px 5px 0px #989898b2", fontSize:"12px", fontFamily: 'Fredoka'}} className='inputSelectSearch' onChange={e => addCoordinator(e)}>
                <option class="mystyle" >Asocie un coordinador</option>
                {
                    coordinators?.map(e => {
                        return <option value={e.id} key={e.id}>{e.name}</option>
                    })
                } 
            </Input>
            <Button style={{borderRadius: "30px",fontSize: "11px",fontWeight:"bold",fontFamily: 'Fredoka',letterSpacing:"1px",border: "1px solid #5939fa" ,backgroundColor: "#5939fa" ,height: "35px", width: "300px", boxShadow: "0px 3px 5px 0px #989898b2"}} className='btn-search' type='submit' onClick={e => handleSubmit(e)}>Agregar excursión</Button>
            
        </Form>


        <div className='div-coordinators'>

            {
                coordinators?.map(e => {

                    return <div>
                        <Button onClick={event => handleClickCoordinators(event, e.id)} className='buttonsCoordinators'>{e.name}</Button>

                    </div>
                })
            }

        </div>
        
            <br />

            <Table size="md" className='userGridTableCoordinators '>

                <thead className="gridTitlesCoordinators">
                    <th>Excursión</th>
                    <th></th>
                    <th></th>
                </thead>
                <tbody>


                    {
                        
                    excursions?.length > 0 ?    excursions?.map(e => {
                            return <tr className={`invidivualGridCoordinators${e.id%2}`} key={e.id} >
                                <td >{e.name}</td>
                                <td></td>
                            <td></td>
                            <td></td>
                            <td style={{userSelect:"none"}}>                                                                                                                      </td>
                                <td><ExuctionsModal value={e} ></ExuctionsModal></td>

                            </tr>

                        })
                        : <strong className='excursionsNone'>No hay excursiones asociadas al coordinador indicado.</strong>
                    }
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

}