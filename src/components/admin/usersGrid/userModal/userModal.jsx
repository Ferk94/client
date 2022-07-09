import {  Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import './userModal.css';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { deleteUserById} from "../../../../redux/actions/userActions";



export function UserModal({value}) {


    const dispatch = useDispatch();

    const [modalState, setModalState] = useState(false)

    function deleteClick(e, id) {
        e.preventDefault();

        dispatch(deleteUserById(id))

    }
   
    return <div className='containerUserModal'>

        <img
            className='redCross'
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
                Seguro que quiere eliminar a {value.name} asignado al coordinador {value.coordinator} de la empresa {value.enterprise}?
            </ModalHeader>
            <ModalBody>
                Esta acción es irreversible.
                Tenga en cuenta que no se podrá recuperar la información luego.
            </ModalBody>
            <ModalFooter >
                <Button
                    color="primary"
                    onClick={event => deleteClick(event, value.id)}
                     
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



