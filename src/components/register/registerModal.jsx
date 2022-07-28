import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";




export function RegisterModal({error, input, handleSubmit, status, inputCoordinator, coordinators}) {


    const [modalState, setModalState] = useState(false)
    const [buttonListenerState, setButtonListenerState] = useState(true)
    const history = useHistory();
   
    
    useEffect(() => {
        setTimeout(() => {
            setButtonListenerState(false)
        }, 2000);
      }, []);

    function modalAndReturn(e){
        e.preventDefault();
        setModalState(!modalState)
        history.push('/')
    }
    

    function openModal(e){
        handleSubmit(e, inputCoordinator, coordinators)
        // setModalState(!modalState)
    }

    const btnRegister = document.getElementById('btnRegister')

    if(
        // ((error?.name
        // || error?.email
        // || error?.password
        // || error?.phoneNumberString
        // || error?.checkbox
        // || error?.CoordinatorId)
        // || (input?.name.length === 0
        //   || input?.email.length === 0 
        //   || input?.password.length === 0
        //   || input?.phoneNumberString === ""
        //   || input?.checkbox !== "on"
        //   || inputCoordinator === ""
        //     ))||
            (buttonListenerState)){
                if(btnRegister != null){
                    btnRegister.disabled = true;
                }
            }else {
                if(btnRegister != null){
                    btnRegister.disabled = false;
                }
            }

    if(status === 200 || status === 0){

    return <div>
        <Button id='btnRegister' onClick={ (e)=> openModal(e) } 
        className={`buttonRegister 
        
        ${buttonListenerState}
              ? "buttonDanger" : ""}
              `}
               type={
                ` ${((error?.name
          || error?.email
          || error?.password
          || error?.phoneNumberString
          || error?.checkbox
          || error?.CoordinatorId)
          || (input?.name.length === 0
            || input?.email.length === 0 
            || input?.password.length === 0
            || input?.phoneNumberString === ""
            || input?.checkbox !== "on"
            || input?.CoordinatorId === null
              ))
              ? "submit" : "button"}
              `
               }
      
        >registrarse</Button>
        
        <Modal
            backdrop={false}
            size={"s"}
            centered
            scrollable
            isOpen={modalState}
            style={{maxWidth:'550px'}}
        >

            <ModalHeader style={{borderTop: '2px solid #5939fa', borderRight: '2px solid #5939fa', borderLeft: '2px solid #5939fa'}}>
                 Su cuenta ha sido creada satisfactoriamente.
            </ModalHeader>
           
            <ModalBody style={{borderRight: '2px solid #5939fa', borderLeft: '2px solid #5939fa'}}>
               Su contraseña será enviada a su casilla de correo.
               Recuerde revisar la sección "spam".
            
               
            </ModalBody>
            
            <ModalFooter style={{borderRight: '2px solid #5939fa', borderLeft: '2px solid #5939fa', borderBottom: '2px solid #5939fa'}}>
                <Button style={{backgroundColor:'#5939fa', border:'#5939fa', fontFamily:'Carrois Gothic SC'}} onClick={(e) => modalAndReturn(e)}>
                    Aceptar
                </Button>
            </ModalFooter>
        </Modal>

    </div>
    }
    
    else {
        return <div>
        <Button onClick={ (e)=> openModal(e) } 
        className={`buttonRegister 
        
        ${((error?.name
          || error?.email
          || error?.password
          || error?.phoneNumberString
          || error?.CoordinatorId)
          || (input?.name.length === 0
            || input?.email.length === 0 
            || input?.password.length === 0
            || input?.phoneNumberString === ""
            || input?.CoordinatorId === null
              ))
              ? "buttonDanger" : ""}
              `}
               type="submit"
      
        >registrarse</Button>
        
        <Modal
            backdrop={false}
            size={"s"}
            centered
            scrollable
            isOpen={modalState}
            
        >

            <ModalHeader style={{borderTop: '2px solid #bd0139', borderRight: '2px solid #bd0139', borderLeft: '2px solid #bd0139'}}>
                 Hubo un fallo al intentar crear su cuenta.
            </ModalHeader>
           
            <ModalBody style={{borderRight: '2px solid #bd0139', borderLeft: '2px solid #bd0139'}}>
            El email o el número de telefono ingresado ya están en uso.
            
               
            </ModalBody>
            
            <ModalFooter style={{borderRight: '2px solid #bd0139', borderLeft: '2px solid #bd0139', borderBottom: '2px solid #bd0139'}}>
                <Button style={{backgroundColor:'#5939fa', border:'#5939fa', fontFamily:'Carrois Gothic SC'}} onClick={(e) => modalAndReturn(e)}>
                    Aceptar
                </Button>
            </ModalFooter>
        </Modal>

    </div>
    }
    
}