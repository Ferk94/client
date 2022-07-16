import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import './adminPhotos.css'
import { postPhotosByExcursionId } from "../../../services/api"
import { getCoordinators } from '../../../redux/actions/coordinatorsActions';
import { getExcursionsByCoordinatorId } from '../../../redux/actions/excursionsActions'
import { Input, Button, Form, Spinner } from 'reactstrap';
import Swal from 'sweetalert2'
import ReactS3 from 'react-s3';


// const secret_key='6Hp5FcRxUWIL5amIPDGaSbjCpb2/Kd3VkFzEn/BK'

// const access_key='AKIA4WT6L7NNGQL3G35D'

export function AdminPhotos() {
    const [FileList, setFileList] = useState([])
    const [excursionId, setExcursionId] = useState(null)
    const [coordinatorId, setCoordinatorId] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const coordinators = useSelector(state => state.getDataInfo.coordinatorsByEnterprise)
    const excursions = useSelector(state => state.getDataInfo.excursions)

console.log(loading, 'el loading')

function onLoad (loading){
    setLoading(!loading)
}


   async function handleSubmit(e, id) {
        e.preventDefault()
        setLoading(true)
        if (!FileList) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Debes cargar alguna imagen y asociarla.',
              })
            return
        }
        
        const formdata = new FormData();

        FileList.forEach(e => {
            return formdata.append('images', e)
        })

        postPhotosByExcursionId(id, formdata, onLoad, loading)
            document.getElementById('file').value = null
            setFileList(null)

       
    }

    useEffect(() => {
        dispatch(getCoordinators())
        dispatch(getExcursionsByCoordinatorId(coordinatorId))
    }, [coordinatorId, dispatch])

    function handleChange(e) {
        e.preventDefault()
        var filesArr = Array.prototype.slice.call(e.target.files);
        setFileList(filesArr)
    }

    function handleSelectCoordinators(e) {
        e.preventDefault();
        setCoordinatorId(e.target.value)

    }

    
    function handleButton(e){
        e.preventDefault();
        dispatch(getExcursionsByCoordinatorId(coordinatorId))
    }

    
    function handleSelectExcursions(e){
        e.preventDefault();
        setExcursionId(e.target.value)
    }

   
    return <div className='componentAdminPhotos'>
        
<br/>
        <Form className='adminPhotosForm'>
        
            <Input className='AdminPhotosCoordinatorsSelect' type='select' name="coordinators" id="coordinators" onChange={(e) => handleSelectCoordinators(e)}>
                <option hidden >ASOCIE COORDINADOR</option>
                {
                    coordinators?.map(e => {
                        return (
                            <option value={e.id} key={e.id}>
                                {e.name}
                            </option>
                        );
                    })
                }
            </Input> 
            <Button style={{marginTop: "10px", marginBottom: "0px", borderRadius: "30px",fontSize: "11px",fontWeight:"bold",fontFamily: 'Fredoka',letterSpacing:"1px",border: "1px solid #5939fa" ,backgroundColor: "#5939fa" ,height: "35px", width: "150px", boxShadow: "0px 3px 5px 0px #989898b2"}} onClick={e => handleButton(e)}>Asociar</Button>
            <br/>
            <Input className='AdminPhotosCoordinatorsSelect' type='select' name="excursions" id="excursions" onChange={(e) => handleSelectExcursions(e)}>
                <option hidden>EXCURSION</option>
                {
                    excursions?.map(e => {
                        return (
                            <option value={e.id} key={e.id}>
                                {e.name}
                            </option>
                        );
                    })
                }
            </Input>
            <br/>
            <Input
                className='AdminPhotosFileInput'
                Button
                multiple name="file"
                id="file"
                type="file"
                action="upload.php"
                onChange={e => handleChange(e)}
                />
                
                <label
                for="file"
                className='AdminPhotosCoordinatorsSelectFile'
                >
                    ELEGIR ARCHIVOS
                </label>
            
            <Button style={{marginTop: "20px" ,borderRadius: "30px",fontSize: "11px",fontWeight:"bold",fontFamily: 'Fredoka',letterSpacing:"1px",border: "1px solid #5939fa" ,backgroundColor: "#5939fa" ,height: "35px", width: "250px", boxShadow: "0px 3px 5px 0px #989898b2"}} type="submit" onClick={e => handleSubmit(e, excursionId)}>Postear</Button>
        </Form>

       { loading === true ? <Spinner style={{display: 'flex', alignSelf: 'center', marginTop : '2%'}}/> : <></> }

    </div>
}