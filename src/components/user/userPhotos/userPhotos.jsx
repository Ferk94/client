import './userPhotos.css'
import axios from 'axios';
import { saveAs } from 'file-saver';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from './paginado/paginado.jsx';
import { PhotosPerPage } from './paginado/photosPerPage.jsx';
import { useHistory } from 'react-router-dom';
import { signOut } from '../../../redux/actions/userActions';
import { Button, Spinner } from 'reactstrap'


// import { useDispatch, useSelector } from ' react-redux';
import { getPhotosByExcursionId, getZipPhotosByExcursionId } from '../../../services/api';
import { getExcursionsByCoordinatorId } from '../../../redux/actions/excursionsActions';
import { UserDownloadModal } from './userDownloadModal';
const zip = require('jszip')();

const {REACT_APP_BACKEND_URL_PRODUCCION} = process.env;

export function UserPhotos({ userInfo }) {


    const [photos, setPhotos] = useState([]);
    const [zipPhotos, setZipPhotos] = useState([]);
    const [excursionId, setExcursionId] = useState(null); 
    const [showButton, setShowButton] = useState(false)
    const excursions = useSelector(state => state?.getDataInfo?.excursions)
    const coordinators = useSelector(state => state?.getDataInfo?.coordinators)
    const [currentPage, setCurrentPage] = useState(1);
    const [loadingContainer, setLoadingContainer] = useState(false)
    //const [ excursionsIdByCoordinator, setExcursionsIdByCoordinator ] = useState([])
    const [coordinator, setCoordinator] = useState({})
    const dispatch = useDispatch();

    

    // var coordinator = coordinators?.find(e => userInfo?.coordinatorId === e.id)
    

    useEffect(() => {
        axios.get(`${REACT_APP_BACKEND_URL_PRODUCCION}coordinators/${userInfo.coordinatorId}`)
        .then(({data}) => {
            setCoordinator(data)
        })
    }, [])

    

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


   

        return <div className='userPhotos'>
            <Button className='buttonUserExit' onClick={(e) => handleSignOut(e)}>Cerrar sesion</Button>
            
      <img className="photosLogo" src="../images/LogoNegro.png" alt="" />
      
            <div className='userPhotosTitle'>
            <strong>Bienvenid@ {userInfo?.name} a tu QBOOK.</strong>
            </div>
            <div className='userPhotosCenter'>
            {/* <div className='userPhotosPie'>Descargá las fotos que más te gusten o utilizá el botón <strong>  DESCARGAR TODO.</strong></div>
            <div className='userPhotosPie'><strong>Recordá que tu book estará disponible durante 15 días desde que iniciaste sesión.</strong></div> */}
            <div className='userPhotosPie'>
            ¡Descarga las fotos que más te gusten! 
            </div>
            <div className='userPhotosPie'>Recordá que tu QBook estará disponible 15 días desde que iniciaste sesión.</div>
            <div className='userPhotosPie'>¡Que disfrutes las fotos!</div>
            <br />
            <br />
                        {/* ---NUEVO BOTON */}
            <div className='downloadAllButton'>
            <div className="containerPCText">
                <div className='PCText'> 
                Elegí el link que mas te convenga, si elegís PC vas a descargar un archivo .ZIP con todas las fotos de tu viaje de egresados.
                </div>
            </div>
            <a className='homeLink' href={`${coordinator?.dropboxPc}`} target='_blank' rel='noreferrer'>
            <Button className='descargarTodo'>
            Descargar PC
            </Button>
            </a>
            </div>
                        {/* -------  */}
            <div className='downloadAllButton'>
            <div className="containerPCText">
            <div className='PCText'> 
            Elegí el link que mas te convenga, si elegís CELULAR nuestro botón va a dirigirte a Dropbox, no es necesario descargar la aplicación.
                </div>
                <div className='PCText'>
                Solo ingresas a la excursión que desees y elegís la foto que
                </div>
                <div className='PCText'>
                más te guste y pones descargar!
                </div>
            </div>
            {/* <UserDownloadModal downloadZip={downloadZip}/> */}
            <a className='homeLink' href={`${coordinator?.dropboxCel}`} target='_blank' rel='noreferrer'>
            <Button className='descargarTodo'>
            Descargar CELULAR
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
