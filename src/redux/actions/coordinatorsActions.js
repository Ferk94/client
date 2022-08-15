import axios from 'axios';

const { REACT_APP_BACKEND_URL_PRODUCCION } = process.env;


export function getCoordinators(){
    return async function(dispatch){
        var json = await axios.get(`${REACT_APP_BACKEND_URL_PRODUCCION}coordinators`)
        return dispatch({
            type: 'GET_COORDINATORS',
            payload: json.data
        })
    }
}

export function getCoordinatorsByEnterpriseId(EnterpriseId){
    return async function(dispatch){
        var json = await axios.get(`${REACT_APP_BACKEND_URL_PRODUCCION}coordinators/byEnterpriseId/${EnterpriseId}`)
        return dispatch({
            type: 'GET_COORDINATORS_BY_ENTERPRISEID',
            payload: json.data
        })
    }
}


export function deleteCoordinator(coordinatorId){
    return async function(dispatch){
        try {
            await axios.delete(`${REACT_APP_BACKEND_URL_PRODUCCION}coordinators/${coordinatorId}`)
            return dispatch({
                type: 'DELETE_COORDINATOR',
                payload: coordinatorId
            })
        }catch(err){
            console.error(err)
        }
        
    }
}

export function editCoordinator(coordinatorId, data){
    return async function(dispatch){
        try {
            await axios.put(`${REACT_APP_BACKEND_URL_PRODUCCION}coordinators/${coordinatorId}`, data)
            return dispatch({
                type: 'EDIT_COORDINATOR',
                payload: {coordinatorId, data}
            })

        }catch(err){
            console.error(err)
        }
    }
}

export function postCoordinator(EnterpriseId, data){
    return async function(dispatch){
        try {
            await axios.post(`${REACT_APP_BACKEND_URL_PRODUCCION}coordinators/${EnterpriseId}`, data)
            return dispatch({
                type: 'POST_COORDINATOR',
                payload: data
            })
        }catch(err){
            console.error(err)
        }
        
    }
}
