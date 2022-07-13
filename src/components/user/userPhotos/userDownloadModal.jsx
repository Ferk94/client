import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import { useState } from "react";



export function UserDownloadModal({downloadZip}) {

    const [modalState, setModalState] = useState(false)
   
    
    
    function downloadAndClose(e){
        e.preventDefault();
        downloadZip(e)
        setModalState(!modalState)
        
    }

    function openModal(e){
        e.preventDefault(e)
        setModalState(!modalState)
    }

   

    return <div>
       
       <div className='downloadAllButton'>
        <Button className='descargarTodo' onClick={e => openModal(e)}>Descargar todo</Button>
        </div>

        <Modal
            backdrop={false}
            size={"s"}
            centered
            scrollable
            isOpen={modalState}
            
        >

            <ModalHeader>
                 Descargar todo en formato zip
            </ModalHeader>
           
            <ModalBody>
               Está a un paso de descagar todas las fotos en formato zip.
               Seleccione descargar si así lo desea o por el contrario cancele.
            
               
            </ModalBody>
            
            <ModalFooter>
                <Button onClick={(e) => downloadAndClose(e)}>
                    Descargar
                </Button>
                <Button onClick={(e) => openModal(e)}>
                    Cancelar
                </Button>
            </ModalFooter>
        </Modal>

    </div>

    
}