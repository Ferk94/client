import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import { useState } from "react";

import { deletePhoto } from '../../../../services/api';
import './deletePhotoModal.css';

export function DeletePhotoModal({ img, excursionId }) {

    const [modalState, setModalState] = useState(false);

    
    function selectNumbersForId(string){
        var regex = /(\d+)/g;
        const idString = string.match(regex)
        const idNumber = parseInt(idString)
       return idNumber
    
    }

    let id = selectNumbersForId(img)
    

    function deleteAndClose(event){
        event.preventDefault();
        deletePhoto(excursionId, id, img)
        setModalState(!modalState)
    }

    function openModal(e){
        e.preventDefault(e)
        setModalState(!modalState)
    }

   

    return <div>
      
       <img
            className='redCrossPhoto'
            src='/images/ELEMENTOS-03.png'
            alt='X'    
            onClick={() => setModalState(!modalState)}
            />
       

        <Modal
            backdrop={false}
            size={"s"}
            centered
            scrollable
            isOpen={modalState}
            
        >

            <ModalHeader>
                 Eliminar foto permanentemente
            </ModalHeader>
           
            <ModalBody>
               Está a punto de eliminar la foto seleccionada.
               La acción es irreversible.
            </ModalBody>
            
            <ModalFooter>
                <Button onClick={(e) => deleteAndClose(e)}>
                    Eliminar
                </Button>
                <Button onClick={(e) => openModal(e)}>
                    cancelar
                </Button>
            </ModalFooter>
        </Modal>

    </div>

    
}