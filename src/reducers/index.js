import {combineReducers} from 'redux'
import { routerReducer } from 'react-router-redux';
import {reducer as tags} from './tags'
import  article from './article'
const initialState = {
    isFetching: true,
    msg: {
        type: 1,//0失败 1成功
        content: ''
    },
    userInfo: {}
};
export const actionsTypes = {
    FETCH_START: "FETCH_START",
    FETCH_END: "FETCH_END",
    USER_LOGIN: "USER_LOGIN",
    USER_REGISTER: "USER_REGISTER",
    RESPONSE_USER_INFO: "RESPONSE_USER_INFO",
    SET_MESSAGE: "SET_MESSAGE",
    USER_AUTH:"USER_AUTH",

};

export const actions = {
    login: function (userInfo) {
        return {
            type: actionsTypes.USER_LOGIN,
            ...userInfo
        }
    },
    register: function (data) {
        return {
            type: actionsTypes.USER_REGISTER,
            data
        }
    },
    clearMsg: function () {
        return {
            type: actionsTypes.SET_MESSAGE,
            success: false,
            msg: ''
        }
    },
    userAuth:function () {
        return{
            type:actionsTypes.USER_AUTH
        }
    },
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionsTypes.FETCH_START:
            return {
                ...state, isFetching: true
            };
        case actionsTypes.FETCH_END:
            return {
                ...state, isFetching: false
            };
        case actionsTypes.SET_MESSAGE:
            return {
                ...state,
                isFetching: false,
                msg: {
                    success: action.success,
                    msg: action.msg
                }
            };
        case actionsTypes.RESPONSE_USER_INFO:
            return {
                ...state, userInfo: action.data
            };
        default:
            return state
    }
}

export default combineReducers({
    route:routerReducer,
    appState: reducer,
    article:article,
    tags:tags
})
