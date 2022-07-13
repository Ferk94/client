import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'; 
import { getExcursionsByCoordinatorId } from '../../../redux/actions/excursionsActions';
import { getCoordinators } from '../../../redux/actions/coordinatorsActions';
import { getPhotosByExcursionId } from '../../../services/api';
import { Input, Button, Form, Spinner } from 'reactstrap';
import { PaginationViewer } from './paginado/paginadoViewer';
import { PhotosPerPageViewer } from './paginado/photosPerPageViewer';


import './adminPhotosView.css';







export const AdminPhotosView = () => {

const [photos, setPhotos] = useState([]);
const [loadingContainer, setLoadingContainer] = useState(false)
const [currentPage, setCurrentPage] = useState(1);
const [excursionIdView, setExcursionIdView] = useState(null);
const [coordinatorIdView, setCoordinatorIdView] = useState(null);


const coordinators = useSelector(state => state.getDataInfo.coordinatorsByEnterprise)
const excursions = useSelector(state => state.getDataInfo.excursions);


const photosPerPage = 50
    const indexLastPhoto = currentPage * photosPerPage;
    const indexFirstPhoto = indexLastPhoto - photosPerPage;
    const currentPhotos = Array.isArray(photos)
        ? photos.slice(indexFirstPhoto, indexLastPhoto)
        : photos;



const dispatch = useDispatch();

useEffect(() => {
    dispatch(getCoordinators())
    dispatch(getExcursionsByCoordinatorId(coordinatorIdView))
    .then(({data})=> setPhotos(data))
    .catch(err => console.error(err))
}, [])

function handleSelectCoordinatorsView(e){
    e.preventDefault();
    setCoordinatorIdView(e.target.value)
}

function handleSelectExcursionsView(e){
    e.preventDefault();
    setExcursionIdView(e.target.value)
}

function handleButtonView(e){
    e.preventDefault();
    dispatch(getExcursionsByCoordinatorId(coordinatorIdView))
}

function dispatchPhotos(e, excursion){
    e.preventDefault();
    getPhotosByExcursionId(excursion)
    .then(({data}) => {
        setPhotos(data)
    })
    .catch(err => console.error(err))
}

function paginado(pageNumber) {
    window.scrollTo(0, 0)
    setCurrentPage(pageNumber);
    setLoadingContainer(true)
    setTimeout(() => {  
        setLoadingContainer(false)
     }, 1000);
}



  return (
    <div className='componentAdminPhotos'>
        <br/>
        <Form className='adminPhotosForm'>
        
        <Input className='AdminPhotosCoordinatorsSelect' type='select' name="coordinators" id="coordinators" onChange={(e) => handleSelectCoordinatorsView(e)}>
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
        <Button style={{marginTop: "10px", marginBottom: "0px", borderRadius: "30px",fontSize: "11px",fontWeight:"bold",fontFamily: 'Fredoka',letterSpacing:"1px",border: "1px solid #5939fa" ,backgroundColor: "#5939fa" ,height: "35px", width: "150px", boxShadow: "0px 3px 5px 0px #989898b2"}} onClick={e => handleButtonView(e)}>Asociar</Button>
        <br/>
        <Input className='AdminPhotosCoordinatorsSelect' type='select' name="excursions" id="excursions" onChange={(e) => handleSelectExcursionsView(e)}>
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
        <Button style={{marginTop: "20px" ,borderRadius: "30px",fontSize: "11px",fontWeight:"bold",fontFamily: 'Fredoka',letterSpacing:"1px",border: "1px solid #5939fa" ,backgroundColor: "#5939fa" ,height: "35px", width: "250px", boxShadow: "0px 3px 5px 0px #989898b2"}} type="submit" onClick={e => {
            dispatchPhotos(e, excursionIdView)
        }}>Visualizar Fotos</Button>
    </Form>
    { loadingContainer===true ? 
            <Spinner style={{width:"100px", height: "100px", display:"flex", alignSelf:"center", color:"#fd014e"}}/> :
                <PhotosPerPageViewer
                currentPhotos={currentPhotos}
                excursionId={excursionIdView}
            />
            }
            
            <PaginationViewer
                photosPerPage={photosPerPage}
                allPhotos={photos?.length}
                paginado={paginado}
                currentPhotos={currentPhotos}
            />
    </div>
  )
}

