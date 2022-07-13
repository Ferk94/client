import './photosPerPageViewer.css'
import { useState, useRef, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Spinner } from 'reactstrap'
import { DeletePhotoModal } from '../deletePhotoModal/deletePhotoModal';


const BACKEND_URL_PRODUCCION = process.env.REACT_APP_BACKEND_URL_PRODUCCION;

export function PhotosPerPageViewer({ currentPhotos, excursionId }) {

    const [model, setModel] = useState(false)
    const [exitModel, setExitModel] = useState(false)
    const [tempImgSrc, setTempImgSrc] = useState("")
    const [loaded, setLoaded] = useState(true)
    const ref = useRef()

    const onLoad = () => {
        setLoaded(false)
      }
    
      useEffect(() => {
        if (ref.current && ref.current.complete) {
          onLoad()
        }
      })

      (currentPhotos, 'el tipo de arreglo de fotos')
      

    // function toggleModal(){
    //     setModalOpen(!modalOpen)
    // }
    const getImg = (imgSrc)=>{
        setTempImgSrc(imgSrc);
        setModel(true);
        setTimeout(() => {
            setExitModel(true)
        }, 500)
    }
    function closeModel (e){
        e.preventDefault();
        setModel(false);
        setExitModel(false)
    }


    return (
    <>
    <div className={model ? "model open" : "model"} >
        <img src={tempImgSrc} alt='' />
        
    </div>
    <div className='photosCards' style={{marginTop:"50px"}}>

        {
            currentPhotos && currentPhotos.map((img, idx) => (
                <>
                
                    <div className='photoCard' key={idx}>
                        
                        <img src={`${img.Location}`}
                        alt="alt" 
                        style={{width:"100%"}} 
                        onLoad={onLoad}
                        onClick={()=> getImg(`${img.Location}`)} />
                        {
                                loaded  ?
                                <div className='spinnerPhotos'><Spinner /></div>
                                :
                                <></>
                            }
                        {exitModel===true ?
                        <CloseIcon 
                        onClick={e => closeModel(e)} 
                        sx={{position: "fixed",
                            top: '10px',
                            right: '10px',
                            width: '2rem',
                            height: '2rem',
                            padding: '5px',
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            color: '#ffffff',
                            cursor: 'pointer',
                            zIndex:"999"
                        }}
                        />:
                        <></>
                    }

                    </div>
                    <DeletePhotoModal img={img.imgName} excursionId={excursionId}/>
</>
            ) )
                        
        }
        
    </div>


    </>
)
}