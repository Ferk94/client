import {  Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { deleteEnterprise } from "../../../../redux/actions/enterprisesActions";


export function EnterprisesModal(evento) {


    const dispatch = useDispatch();

    const [modalState, setModalState] = useState(false)

    function deleteClick(e, id) {
        e.preventDefault();
        setModalState(!modalState);
        dispatch(deleteEnterprise(id))

    }
   
    return <div>
<img
            className='redCrossCoordinator'
            src='/images/ELEMENTOS-03.png'
            alt='X'    
            onClick={() => setModalState(!modalState)}
            />
        <Modal

            centered
            scrollable
            isOpen={modalState}
        >
            <ModalHeader>
                Seguro que quiere eliminar a "{evento.value.name}"?
            </ModalHeader>
            <ModalBody>
                Esta acción es irreversible.
                Tenga en cuenta que no se podrá recuperar la información luego.
            </ModalBody>
            <ModalFooter >
                <Button
                    color="primary"
                    onClick={event => deleteClick(event, evento.value.id)} 
                >
                    Si, Eliminar
                </Button>

                <Button onClick={() => setModalState(!modalState)}>
                    Cancelar
                </Button>
            </ModalFooter>
        </Modal>

    </div>
}



