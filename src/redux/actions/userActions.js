
import axios from 'axios';
import { LOG_IN, SIGN_UP, GET_USER_INFO, SIGN_OUT } from './constants/constants';

const { REACT_APP_BACKEND_URL_PRODUCCION } = process.env;


export function getUsers() {
  return function (dispatch) {
    axios.get(`${REACT_APP_BACKEND_URL_PRODUCCION}users`).then((response) => {
      return dispatch({
        type: "GET_USERS",
        payload: response.data,
      });
    });
  };
}


export function signUp(input){
    return async function(dispatch){
        try{
           const response = await axios.post(`${REACT_APP_BACKEND_URL_PRODUCCION}user`, input)
           dispatch({ type: SIGN_UP, payload: response.data.token });
           dispatch({
             type: GET_USER_INFO,
             payload: response.data.user
           });
           return "Account created";

        }catch(error){
            if(error.response.status === 400){
                return error.response.data.message
            }
        }
    }
}

export function logIn(email, password) {
    return async function (dispatch) {
        try{    
                const object = {email, password}
                const response = await axios.post(`${REACT_APP_BACKEND_URL_PRODUCCION}user/login`, object)
                if(response.data.token){
                    dispatch({type: LOG_IN, payload: response.data.token})
                    dispatch({
                    type: GET_USER_INFO,
                    payload: response.data.user
                })
                } if(response.data.notAcepted){
                    dispatch({type: 'NOT_ACEPTED', payload: response.data.notAcepted })
                }

                
                   
            }   
                catch(err) {
                const array = err.message.split(" ")
                const status = Number(array[array.length - 1])
                dispatch({
                  type: 'NOT_ACEPTED',
                  payload: err.message
                })
                return dispatch({
                    type: 'INFO_VALID',
                    payload: status
                })
            }
    }

}

export function clearInfoValid() {
  return {
    type: "CLEAR_INFO_VALID",
  };
}

export function signOut() {
  return {
    type: SIGN_OUT,
  };
}

export function searchUsers(input) {
  return {
    type: "SEARCH_USER",
    payload: input,
  };
}

export function searchUserEnterprise(input) {
  return {
    type: "SEARCH_USER_BY_ENTERPRISE",
    payload: input,
  };
}

export function searchUserCoordinator(input) {
  return {
    type: "SEARCH_USER_BY_COORDINATOR",
    payload: input,
  };
}

export function orderUsersById(type) {
  return {
    type: "ORDER_BY_ID",
    payload: type,
  };
}

export function deleteUserById(id) {
  return function (dispatch) {
    axios
      .delete(`${REACT_APP_BACKEND_URL_PRODUCCION}users/${id}`)
      .then((response) => {
        return dispatch({
          type: "DELETE_USER_BY_ID",
          payload: id,
        });
      })
      .catch((err) => console.error(err));
  };
}

export function aceptedUserById(id) {
  return function (dispatch) {
    axios
      .patch(`${REACT_APP_BACKEND_URL_PRODUCCION}user/${id}`)
      .then(response => {
        return dispatch({
          type: "ACEPTED_USER",
          payload: response.data
        })
      })
      .catch(err => console.error(err))
  }
}
