import {
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    GET_USER_INFO,
    SIGN_OUT,
    SIGN_UP,
    LOG_IN,
  } from '../actions/constants/constants';

  export function getTokenLocalStorage() {
    const token = window.localStorage.getItem("token");
    return token ? JSON.parse(token) : "";
  }

  export function setTokenLocalStorage(token) {
    window.localStorage.setItem("token", JSON.stringify(token));
  }

const initialState = {
    userInfo: {},
    token: getTokenLocalStorage(),
    infoValid: null
  };
  
  const updateUserInfo = (state = initialState, action) => {
    switch (action.type) {
      case SIGN_UP:
        setTokenLocalStorage(action.payload)
        return{...state, token: action.payload}
      case LOG_IN:
        setTokenLocalStorage(action.payload)
        return {...state, token: action.payload}
      case USER_UPDATE_REQUEST:
        return { ...state, loading: true };
      case USER_UPDATE_SUCCESS:
        return { ...state, loading: false, userInfo: action.payload };
      case USER_UPDATE_FAIL:
        return { ...state, loading: false, error: action.payload };
      case GET_USER_INFO:
        return { ...state, loading: false, userInfo: action.payload };
      case 'INFO_VALID':
        return { ...state, loading: false, infoValid: action.payload };
      case 'CLEAR_INFO_VALID':
        return {...state, loading: false, infoValid: null}
      case SIGN_OUT:
        window.localStorage.removeItem("token");
        return { ...state, loading: false, userInfo: initialState, token: '' };
      default:
        return state;
    }
  };
  
  export default updateUserInfo;