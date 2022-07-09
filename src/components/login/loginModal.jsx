import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import { useState } from "react";
import { useSelector } from 'react-redux';



export function LoginModal({error, input, handleSubmit}) {


    const [modalState, setModalState] = useState(false)
    const infoValid = useSelector(state => state.updateUserInfo?.infoValid);
   
    function openModal(){
        handleSubmit()
        if(infoValid === 500 || infoValid === null){
            setModalState(!modalState)
        }
    }
    

    function closeModal(e){
        e.preventDefault();
        setModalState(!modalState)
    }


    return <div>
        <Button onClick={e => openModal(e)} type='submit' className="buttonLoginLogin">iniciar sesion</Button>
        
        <Modal
            backdrop={false}
            size={"s"}
            centered
            scrollable
            isOpen={modalState}
            
        >

            <ModalHeader>
                 No ha podido iniciar sesión satisfactioriamente
            </ModalHeader>
           
            <ModalBody>
               e-mail o contraseña incorrectas.
               
            </ModalBody>
            
            <ModalFooter>
                <Button onClick={(e) => closeModal(e)}>
                    Aceptar
                </Button>
            </ModalFooter>
        </Modal>

    </div>
}