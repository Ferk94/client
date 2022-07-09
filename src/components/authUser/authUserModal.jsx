 import "./authUserModal.css" 
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Spinner } from 'reactstrap'
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";



export function AuthUserModal() {


    const [modalState, setModalState] = useState(true)
    const [loading, setLoading] = useState(true)
    const notAcepted = useSelector(state => state?.getDataInfo?.notAcepted)

    const history = useHistory();
   
    
    function closeModal(e){
        e.preventDefault();
        setModalState(!modalState)
        history.push('/')
    }
    useEffect(()=>{
        setTimeout(() => {  
            setLoading(false)
         }, 5000);
    }, [])


    if(notAcepted === "El administrador aún no lo ha aceptado"){
        return <div className='authUserModalContainer'>
        {
        loading === true ? 
        <div className="spinnerModal">
        <Spinner style={{color: "white", marginTop:"20%", width:"100px", height: "100px"}} /> </div> :
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
               El administrador aún no lo ha aceptado.
               Intente en otro momento.
            </ModalBody>
            
            <ModalFooter>
                <Button onClick={(e) => closeModal(e)}>
                    Aceptar
                </Button>
            </ModalFooter>
        </Modal>
        }

    </div>
    }else{
        return <div className='authUserModalContainer'>
        {
        loading === true ? 
        <div className="spinnerModal">
        <Spinner style={{color: "white", marginTop:"20%", width:"100px", height: "100px"}} /> </div> :
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
               E-mail o contraseña incorrectas.
               
            </ModalBody>
            
            <ModalFooter>
                <Button onClick={(e) => closeModal(e)}>
                    Aceptar
                </Button>
            </ModalFooter>
        </Modal>
        }

    </div>
    }

    
}