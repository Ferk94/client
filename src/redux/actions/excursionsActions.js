import axios from 'axios';


const { REACT_APP_BACKEND_URL_PRODUCCION } = process.env;


export function getExcursionsByCoordinatorId(coordinatorId){
    return async function(dispatch){
        var json = await axios.get(`${REACT_APP_BACKEND_URL_PRODUCCION}excursions/${coordinatorId}`)
        return dispatch({
            type: 'GET_EXCURSIONS_BY_COORDINATOR',
            payload: json.data
        })
    }
}

export function postExcursionByCoordinatorId(coordinatorId, excursion){
    return async function(dispatch){
        try {
            await axios.post(`${REACT_APP_BACKEND_URL_PRODUCCION}excursions/${coordinatorId}`, excursion)
            return dispatch({
                type: 'POST_EXCURSION',
                payload: excursion
            })
        }catch(err){
            console.error(err)
        }
        
    }
}

export function deleteExcursion(excursionId){
    return async function(dispatch){
        try{
            await axios.delete(`${REACT_APP_BACKEND_URL_PRODUCCION}excursions`)
            return dispatch({
                type: 'DELETE_EXCURSION',
                payload: excursionId
            })
        }catch(err){
            console.error(err)
        }
    }
}
