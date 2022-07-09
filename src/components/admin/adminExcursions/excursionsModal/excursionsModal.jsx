import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteExcursion } from "../../../../redux/actions/excursionsActions";
// import { getCoordinators } from "../../../../redux/actions/coordinatorsActions";



export function ExuctionsModal({ value }) {


    const dispatch = useDispatch();

    const [modalState, setModalState] = useState(false)
    const coordinators = useSelector(state => state?.getDataInfo?.coordinators)
    const enterprises = useSelector(state => state?.getDataInfo?.enterprises)


    function deleteClick(e, id) {
        e.preventDefault();

        dispatch(deleteExcursion(id))

        setModalState(!modalState);

    }

    function findCoordinator(id, coordinadores) {
        const coordinatorName = coordinadores?.find(e => e.id === id)
        return coordinatorName
    }

    function findEnterprise(id, empresas) {
        const enterprise = empresas?.find(e => e.id === id)
        return enterprise?.name
    }

    const coordinator = findCoordinator(value?.CoordinatorId, coordinators)
    const enterprise = findEnterprise(coordinator?.EnterpriseId, enterprises)

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
                 Seguro que quiere eliminar la excursión "{value.name}" a nombre de {coordinator?.name} de la empresa {enterprise} ? 
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



