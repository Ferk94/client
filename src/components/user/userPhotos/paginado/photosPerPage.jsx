import './photosPerPage.css'
import { useState, useRef, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";
import { Spinner } from 'reactstrap'


const BACKEND_URL_PRODUCCION = process.env.REACT_APP_BACKEND_URL_PRODUCCION;

export function PhotosPerPage({ currentPhotos, downloadImage, excursionId }) {

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
        <img src={tempImgSrc} alt="imagen o ruta rota" />
    </div>
    <div className='photosCards' style={{marginTop:"50px"}}>

        {
            currentPhotos && currentPhotos.map((img, idx) => (
                <>
                
                    <div className='photoCard' key={idx}>
                        
                        <img src={`${BACKEND_URL_PRODUCCION}${img}`} 
                        alt="imagen o ruta rota"
                        style={{width:"100%"}} 
                        onLoad={onLoad}
                        onClick={()=> getImg(`${BACKEND_URL_PRODUCCION}${img}`)} />
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
                    <Link><img  className="iconDetail" onClick={e => downloadImage(e, `${BACKEND_URL_PRODUCCION}${img}`, `descarga.${img.split('.')[1]}`)} src=".././images/IconDescarga.png" alt="" /></Link>
</>
            ) )
                        
        }
        
    </div>


    </>
)
}