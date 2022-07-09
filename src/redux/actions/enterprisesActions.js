import axios from 'axios';

const { REACT_APP_BACKEND_URL_PRODUCCION } = process.env;

export function getEnterprises(){
    return async function(dispatch){
        var json = await axios.get(`${REACT_APP_BACKEND_URL_PRODUCCION}enterprises/`)
        return dispatch({
            type: 'GET_ENTERPRISES',
            payload: json.data
        })
    }
}

export function deleteEnterprise(enterpriseId){
    return async function(dispatch){
        try {
            axios.delete(`${REACT_APP_BACKEND_URL_PRODUCCION}enterprises/`)
            return dispatch({
                type: 'DELETE_ENTERPRISE',
                payload: enterpriseId
            })

        }catch(err){
            console.error(err)
        }
    }
}

export function postEnterprise(data){
    return async function(dispatch){
        try {
            await axios.post(`${REACT_APP_BACKEND_URL_PRODUCCION}enterprises/`, data)
            return dispatch({
                type: 'POST_ENTERPRISE',
                payload: data
            })

        }catch(err) {
            console.error(err)
        }
    }
}