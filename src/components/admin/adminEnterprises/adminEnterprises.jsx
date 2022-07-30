import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEnterprises, postEnterprise } from '../../../redux/actions/enterprisesActions';
import { Button, Form, Input, Table } from 'reactstrap';
import './adminEnterprises.css';
import { EnterprisesModal } from './enterprisesModal/enterprisesModal';
import Swal from 'sweetalert2'

export function AdminEnterprises() {
    const dispatch = useDispatch();
    const [enterprise, setEnterprise] = useState({
        name: null
    })
    const enterprises = useSelector(state => state.getDataInfo.enterprises);

    useEffect(() => {
        dispatch(getEnterprises())
    }, [dispatch])

    function handleChange(e) {
        e.preventDefault();
        setEnterprise({
            ...enterprise,
            [e.target.name]: e.target.value,

        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postEnterprise(enterprise))
        setEnterprise({ name: null })
        Swal.fire({
            icon: 'success',
            title: 'Éxito!',
            text: 'Empresa creada correctamente.',
          })
	dispatch(getEnterprises());
    }
    
    


    if(enterprises?.length === 0){
        return <div className='adminEnterprisesComponent'>

        

                    <Form className='searchBar-form' style={{marginTop: "25px", marginBottom: "25px"}}>
                        
                        <Input style={{ marginLeft: "5px",marginRight: "5px",borderRadius: "30px",boxShadow: "-3px 4px 5px 0px #989898b2",fontFamily: 'Fredoka', fontSize:"12px"}} placeholder='Escribir aqui nombre de la empresa' name='name' type="text" value={enterprise.name} onChange={e => handleChange(e)}></Input>

                        <Button style={{marginLeft: "5px",marginRight: "5px",borderRadius: "30px",fontSize: "11px",fontWeight:"bold",fontFamily: 'Fredoka',letterSpacing:"1px",border: "1px solid #5939fa" ,backgroundColor: "#5939fa" ,height: "35px", width: "400px", boxShadow: "0px 3px 5px 0px #989898b2"}}  type='submit' onClick={e => handleSubmit(e)}>Agregar empresa</Button>
                        
                    </Form>
                </div>
    }else{
        return <div className='adminEnterprisesComponent'>

        

        <Form className='searchBar-form' style={{marginTop: "25px", marginBottom: "25px"}}>
            
            <Input style={{ marginLeft: "5px",marginRight: "5px",borderRadius: "30px",boxShadow: "-3px 4px 5px 0px #989898b2",fontFamily: 'Fredoka', fontSize:"12px"}} placeholder='Escribir aqui nombre de la empresa' name='name' type="text" value={enterprise.name} onChange={e => handleChange(e)}></Input>

            <Button style={{marginLeft: "5px",marginRight: "5px",borderRadius: "30px",fontSize: "11px",fontWeight:"bold",fontFamily: 'Fredoka',letterSpacing:"1px",border: "1px solid #5939fa" ,backgroundColor: "#5939fa" ,height: "35px", width: "400px", boxShadow: "0px 3px 5px 0px #989898b2"}}  type='submit' onClick={e => handleSubmit(e)}>Agregar empresa</Button>
            
        </Form>
    
        <Table size="md" className='userGridTableCoordinators '>

            <thead className="gridTitlesCoordinators">
                    <th>Empresas</th>
                    <th></th>
                    <th></th>

            </thead>
            <tbody>
                    {
                    enterprises.map(e => {
                        return <tr className={`invidivualGridCoordinators${e.id%2}`} key={e.id}>
                            <td >{e.name}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td style={{userSelect:"none"}}>                                                                                                                      </td>
                            <td><EnterprisesModal value={e}></EnterprisesModal></td>
                              </tr>
                         })
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
    
}
