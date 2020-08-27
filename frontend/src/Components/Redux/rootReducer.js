import {combineReducers} from 'redux'
import authReducer from './Authentication/AuthReducer'
import ResourceReducer from './Resources/ResourceReducer'


export default combineReducers({
    auth:authReducer,
    resource:ResourceReducer
})