import './userPhotos.css'
import { saveAs } from 'file-saver';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from './paginado/paginado.jsx';
import { PhotosPerPage } from './paginado/photosPerPage.jsx';
import { useHistory } from 'react-router';
import { signOut } from '../../../redux/actions/userActions';
import { Button, Spinner } from 'reactstrap'


// import { useDispatch, useSelector } from ' react-redux';
import { getPhotosByExcursionId, getZipPhotosByExcursionId } from '../../../services/api';
import { getExcursionsByCoordinatorId } from '../../../redux/actions/excursionsActions';
import { UserDownloadModal } from './userDownloadModal';
const zip = require('jszip')();

export function UserPhotos({ userInfo }) {


    const [photos, setPhotos] = useState([]);
    const [zipPhotos, setZipPhotos] = useState([]);
    const [excursionId, setExcursionId] = useState(null); 
    const [showButton, setShowButton] = useState(false)
    const excursions = useSelector(state => state.getDataInfo.excursions)
    const coordinators = useSelector(state => state.getDataInfo.coordinators)
    const [currentPage, setCurrentPage] = useState(1);
    const [loadingContainer, setLoadingContainer] = useState(false)
    //const [ excursionsIdByCoordinator, setExcursionsIdByCoordinator ] = useState([])
    
    const dispatch = useDispatch();

    

    console.log(coordinators, 'coodinadores q vienen 31')
    console.log(userInfo, 'la userinfo')

    var coordinator = coordinators?.find(e => userInfo.coordinatorId === e.id)
    


    if(coordinator.name === 'Oriana'){
        coordinator = {
            ...coordinator,
            zip: 'https://www.dropbox.com/t/BF5bCwrGWxdju5OL'
        }        
    }else if(coordinator.name === 'Javier'){
        coordinator = {
            ...coordinator,
            zip: 'https://www.dropbox.com/t/tXaxHHUnouT7tqEn'
        }  
    }else if(coordinator.name === 'Mati Arana'){
        coordinator = {
            ...coordinator,
            zip: 'https://www.dropbox.com/t/duAOrhjtofhCrVFi'
        }  
    }else if(coordinator.name === 'Mati Zimes'){
        coordinator = {
            ...coordinator,
            zip: 'https://www.dropbox.com/t/3Z1XWErDdjorvBOQ'
        }  
    }else if(coordinator.name === 'Mely'){
        coordinator = {
            ...coordinator,
            zip: 'https://www.dropbox.com/t/ZfbpT88vSpt60Hoq'
        }  
    }else if(coordinator.name === 'Nahuel Cañete'){
        coordinator = {
            ...coordinator,
            zip: 'https://www.dropbox.com/t/0jEsUgN3QD1xSVxr'
        }  
    }

    const history = useHistory();
    const photosPerPage = 9
    const indexLastPhoto = currentPage * photosPerPage;
    const indexFirstPhoto = indexLastPhoto - photosPerPage;
    const currentPhotos = Array.isArray(photos)
        ? photos.slice(indexFirstPhoto, indexLastPhoto)
        : photos;

    function paginado(pageNumber) {
        window.scrollTo(0, 0)
        setCurrentPage(pageNumber);
        setLoadingContainer(true)
        setTimeout(() => {  
            setLoadingContainer(false)
         }, 1000);
    }
    

    useEffect(() => {
        dispatch(getExcursionsByCoordinatorId(userInfo.coordinatorId))
    }, [dispatch, userInfo.coordinatorId])

    function downloadImage(e, data, name) {
        e.preventDefault()
        saveAs(data, name)
    }
    // useEffect(() => {
    //     getPhotosByExcursionId()
        
    // }, []) 

    function downloadZip(e) {
        e.preventDefault()

        if(zipPhotos.length === 0){
            alert("No hay fotos asociadas a esa excursión, pruebe con otra.")
            return;
        }
        zipPhotos.map(e => {
            return zip.file(e.name, e.data.data)
        })
        zip.generateAsync({ type: 'blob' }).then((content) => {
            saveAs(content, 'fotos.zip')
        })
    }

    



    function handleSignOut(e) {
        e.preventDefault()
        dispatch(signOut())
        history.push('/')

    }

    function handleGetPhotos(e, id) {
        e.preventDefault();
        setShowButton(true)
        getPhotosByExcursionId(id)
            .then(({ data }) => {
                setPhotos(data)
                setExcursionId(id)
                return getZipPhotosByExcursionId(id)
            })
            .then(({ data }) => setZipPhotos(data))
            .catch(err => console.error(err))
    }

    if(showButton === true && photos.length === 0){
        return <div className='userPhotos'>
        <Button className='buttonUserExit' onClick={(e) => handleSignOut(e)}>Cerrar sesion</Button>
        
  <img className="photosLogo" src="../images/LogoNegro.png" alt="" />
        <div className='userPhotosTitle'>
        <strong>Bienvenido/a {userInfo?.name} a tu QBOOK.</strong>
        </div>
        <div className='userPhotosCenter'>
        <div className='userPhotosPie'>Descargá las fotos que más te gusten o utilizá el botón <strong>  DESCARGAR TODO.</strong></div>
        <div className='userPhotosPie'><strong>Recordá que tu book estará disponible durante 15 días desde que iniciaste sesión.</strong></div>
        <br />
        <br />
        {/* <UserDownloadModal downloadZip={downloadZip}/> */}
        <Button className='descargarTodo'>
            <a className='homeLink' href={`${coordinator.dropbox}`} target='blank' rel='noreferrer'>
            Descargar todo
            </a>
            </Button>
        {/* <div className='excursionButtons'>
            {
                excursions.map((e, i) => {
                    return <Button key={i} className="btn-excursion" onClick={event => handleGetPhotos(event, e.id)}>{e.name}</Button>
                })
            }
         
        </div> */}
        {/* <h1 className='userPhotosPie'><strong>No hay fotos asociadas a esta excursión</strong></h1>
        <br></br>
        <div className='userPhotosPie'>No se preocupe, de seguro habrá en alguna otra excursión</div> */}
        </div>
    </div>
    }
    
    if (showButton === true && photos.length > 0) {
        return <div className="userPhotos">
                 <Button className='buttonUserExit' onClick={(e) => handleSignOut(e)}>Cerrar sesion</Button>
            
      <img className="photosLogo" src="../images/LogoNegro.png" alt="logoBlancologin" />
            <div className='userPhotosTitle'>
            <strong>Bienvenido/a {userInfo?.name} a tu QBOOK.</strong>
            </div>
            <div className='userPhotosCenter'>
            <div className='userPhotosPie'>Descargá las fotos que más te gusten o utilizá el botón <strong>  DESCARGAR TODO.</strong></div>
            <div className='userPhotosPie'><strong>Recordá que tu book estará disponible durante 15 días desde que iniciaste sesión.</strong></div>
            <br />
            <br />
            <div className='downloadAllButton'>
            {/* <UserDownloadModal downloadZip={downloadZip}/> */}
            <div className="phoneText">
                Elegí el link que mas te convenga, si elegis CELULAR nuestro boton va a dirigirte a Dropbox, no es necesario descargar la aplicación. Solo ingresas a la excursión que desees y elegis la foto que mas te guste y pones descargar!
            </div>
            <Button className='descargarTodo'>
            <a className='homeLink' href={`${coordinator.dropbox}`} target='blank' rel='noreferrer'>
            Descargar todo
            </a>
            </Button>
            </div>
            {/* <div className='excursionButtons'>
                {
                    excursions.map(e => {
                        return<Button className="btn-excursion" onClick={event => handleGetPhotos(event, e.id)}>{e.name}</Button>
                    })
                }
            </div> */}
            </div>
            {/* { loadingContainer===true ? 
            <Spinner style={{width:"100px", height: "100px", display:"flex", alignSelf:"center", color:"#5939fa"}}/> :
                <PhotosPerPage
                downloadImage={downloadImage}
                currentPhotos={currentPhotos}
                downloadZip={downloadZip}
                excursionId={excursionId}
            />
            } */}
            
            {/* <Pagination
                photosPerPage={photosPerPage}
                allPhotos={photos?.length}
                paginado={paginado}
                currentPhotos={currentPhotos}
            /> */}
        </div >
    } else {
        return <div className='userPhotos'>
            <Button className='buttonUserExit' onClick={(e) => handleSignOut(e)}>Cerrar sesion</Button>
            
      <img className="photosLogo" src="../images/LogoNegro.png" alt="" />
            <div className='userPhotosTitle'>
            <strong>Bienvenido/a {userInfo?.name} a tu QBOOK.</strong>
            </div>
            <div className='userPhotosCenter'>
            <div className='userPhotosPie'>Descargá las fotos que más te gusten o utilizá el botón <strong>  DESCARGAR TODO.</strong></div>
            <div className='userPhotosPie'><strong>Recordá que tu book estará disponible durante 15 días desde que iniciaste sesión.</strong></div>
            <br />
            <br />
                        {/* ---NUEVO BOTON */}
            <div className='downloadAllButton'>
            <div className="phoneText">
                Elegí el link que mas te convenga, si elegis PC vas a descargar un archivo .ZIP con todas las fotos de tu viaje de egresados.
            </div>
            <a className='homeLink' href={`${coordinator.zip}`} target='_blank' rel='noreferrer'>
            <Button className='descargarTodo'>
            Descargar todo
            </Button>
            </a>
            </div>
                        {/* -------  */}
            <div className='downloadAllButton'>
            <div className="phoneText">
                Elegí el link que mas te convenga, si elegis CELULAR nuestro boton va a dirigirte a Dropbox, no es necesario descargar la aplicación. Solo ingresas a la excursión que desees y elegis la foto que mas te guste y pones descargar!
            </div>
            {/* <UserDownloadModal downloadZip={downloadZip}/> */}
            <a className='homeLink' href={`${coordinator.dropbox}`} target='_blank' rel='noreferrer'>
            <Button className='descargarTodo'>
            Descargar todo
            </Button>
            </a>
            </div>
            {/* <div className='excursionButtons'>
                {
                    excursions.map((e, i) => {
                        return <Button key={i} className="btn-excursion" onClick={event => handleGetPhotos(event, e.id)}>{e.name}</Button>
                    })
                }
             
            </div> */}
            {/* <h1 className='userPhotosPie'><strong>Aquí aparecerán las fotos de sus excursiones</strong></h1>
            <br></br>
            <div className='userPhotosPie'>Recordá que debes filtrar por alguna excursión para ver su respectivo book.</div> */}
            </div>
        </div>
    }
}