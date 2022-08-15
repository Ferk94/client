import { Button, Input, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./coordinatorsModal.css";
import { editCoordinator } from "../../../../redux/actions/coordinatorsActions";
import editButton from '../../../../assets/images/edit.png';


export function EditModal({ value }) {
  const initialState = { name: value.name, dropboxCel: '', dropboxPc: ''}
  const dispatch = useDispatch();

  const [modalState, setModalState] = useState(false);
  const [input, setInput] = useState(initialState)

  function editClick(e, id) {
    e.preventDefault();

     dispatch(editCoordinator(id, input));

    setModalState(!modalState);
  }

  function handleChange(e){
    e.preventDefault();
    setInput({
        ...input,
        [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <button 
      style={{width: '20px', height: '20px', position: 'absolute', visibility: 'hidden', cursor: 'pointer'}}
      onClick={() => setModalState(!modalState)}
      >
        <img src={editButton}
         alt='not found' 
         style={{width: '20px', height: '20px', position: 'relative', marginTop: '-10px', marginLeft: '-8px', visibility: 'visible'}}/>
      </button>
      <Modal centered scrollable isOpen={modalState}>
        <ModalHeader>
          Editar Datos del coordinador
        </ModalHeader>
        <ModalBody>
        <Input
            style={{
              boxShadow: "-3px 4px 5px 0px #989898b2",
              fontFamily: "Fredoka",
              fontSize: "12px",
            }}
            // className="inputSelectSearch"
            type="text"
            name="name"
            id="name"
            value={value.name}
            placeholder="Nombre y apellido"
            onChange={(e) => handleChange(e)}
          ></Input>
          <Input
            style={{
              boxShadow: "-3px 4px 5px 0px #989898b2",
              fontFamily: "Fredoka",
              fontSize: "12px",
            }}
            // className="inputSelectSearch"
            type="text"
            name="dropboxCel"
            id="dropboxCel"
            placeholder="link dropbox cel"
            onChange={(e) => handleChange(e)}
          ></Input>
          <Input
            style={{
              boxShadow: "-3px 4px 5px 0px #989898b2",
              fontFamily: "Fredoka",
              fontSize: "12px",
            }}
            // className="inputSelectSearch"
            type="text"
            name="dropboxPc"
            id="dropboxPc"
            placeholder="link dropbox Pc"
            onChange={(e) => handleChange(e)}
          ></Input>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={(event) => editClick(event, value.id)}
          >
            Si, Editar
          </Button>

          <Button onClick={() => setModalState(!modalState)}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}