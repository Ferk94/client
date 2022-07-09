import {  Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import './aceptedModal.css';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { aceptedUserById, getUsers } from '../../../../redux/actions/userActions';




export function AceptedModal({value}) {

    const isAcepted = value.isAcepted
    const dispatch = useDispatch();

    const [modalState, setModalState] = useState(false)

    function aceptedClick(e, id) {
        e.preventDefault();

        dispatch(aceptedUserById(id))
        dispatch(getUsers())
        setModalState(!modalState)

    }
   
    return <div className='containerAceptedModal'>

        <img
            className={isAcepted ? 'greenTick-acepted' : 'greenTick'}
            src='/images/ELEMENTOS-01.png'
            alt='Y'    
            onClick={() => setModalState(!modalState)}
        />
        <Modal

            centered
            scrollable
            isOpen={modalState}
        >
            <ModalHeader>
                Seguro que quiere aceptar a {value.name} asignado al coordinador {value.coordinator} de la empresa {value.enterprise}?
            </ModalHeader>
            <ModalBody>
                Esta acción es irreversible.
                Tenga en cuenta que sólo podrá borrar el usuario luego.
            </ModalBody>
            <ModalFooter >
                <Button
                    color="primary"
                    onClick={event => aceptedClick(event, value.id)}
                     
                >
                    Si, Aceptar
                </Button>

                <Button onClick={() => setModalState(!modalState)}>
                    Cancelar
                </Button>
            </ModalFooter>
        </Modal>

    </div>
}