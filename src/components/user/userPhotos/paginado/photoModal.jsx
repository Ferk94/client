import './photosPerPage.css'
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import { useState } from "react";
import { Link } from 'react-router-dom';


export function PhotoModal({imagen}) {


    const [modalState, setModalState] = useState(false)
    const [imageSize, setImageSize] = useState(0, 0)
     
    const styleUserPhotosDetailHorizontal = { borderRadius:"5px", width:"58%", height:"auto"}
    const styleUserPhotosDetailVertical = { borderRadius:"5px", width:"40%", height:"auto"}



    function imgSize(){
        var myImg = document.querySelector("#photoModalImage");
        var realWidth = myImg.naturalWidth;
        var realHeight = myImg.naturalHeight;
        setImageSize(realHeight - realWidth)
    }

    return <div className='userPhotosDetailContainer'>
        
        <button className="buttonSearch" onClick={() => setModalState(!modalState)}>
            <img className="iconSearch"  src=".././images/IconDetail.png" alt="" />
        </button>
        <Modal
            backdrop={false}
            size={"xl"}
            centered
            isOpen={modalState}
            
            style={
                imageSize < 0 ?
                styleUserPhotosDetailHorizontal :
                styleUserPhotosDetailVertical
            }
            
        >

            
           
            <ModalBody
            style={{margin:"0px", padding:"0px", margin:"0px"}}
            >
               <img id='photoModalImage' onLoad={e => imgSize()} className='userPhotoDetail' src={imagen} alt="" />
               
            </ModalBody>
            
            <ModalFooter
            style={{height:"30px", margin:"0px"}}
            >
                <Button 
                onClick={() => setModalState(!modalState)}
                style={{borderRadius: "30px",fontSize: "11px",fontWeight:"bold",fontFamily: 'Fredoka',letterSpacing:"1px",border: "1px solid #5939fa" ,backgroundColor: "#5939fa" ,height: "20px", width: "100px", boxShadow: "0px 3px 5px 0px #989898b2", margin:"-5px", padding:"0px"}}
                >
                    Cerrar
                </Button>
            </ModalFooter>
        </Modal>

    </div>
}
