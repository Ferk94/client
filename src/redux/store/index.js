import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';  
import getDataInfo from '../reducer/GetDataInfo';
import updateUserInfo from '../reducer/updateUserInfo';

const persistConfig = {
    key: "root",
    storage,
    whiteList: ["userInfo", "infoValid", "loading"]
}



const rootReducer = combineReducers({
    updateUserInfo,
    getDataInfo,
})

const reducers = persistReducer(persistConfig, rootReducer);

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

