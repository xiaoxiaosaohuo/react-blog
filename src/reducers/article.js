import {combineReducers} from 'redux'

const initialState = [];
const initialDetail = {};
const initialList = {
    records: [],
    pageNum: 1,
    total: 0
};


export const actionTypes = {
    CREATE_ARTICLE:"CREATE_ARTICLE",
    GET_ARTICLE_DETAIL: "GET_ARTICLE_DETAIL",
    RESPONSE_ARTICLE_DETAIL: "RESPONSE_ARTICLE_DETAIL",
    GET_ARTICLE_LIST: "GET_ARTICLE_LIST",
    RESPONSE_ARTICLE_LIST: "RESPONSE_ARTICLE_LIST",


};

export const actions = {
    createArticle: function (data) {
        return {
            type: actionTypes.CREATE_ARTICLE,
            data
        }
    },
    getArticleDetail: function (data) {
        return {
            type: actionTypes.GET_ARTICLE_DETAIL,
            data
        }
    },
    getArticleList: function (topics = '', pageNum = 1) {
        return {
            type: actionTypes.GET_ARTICLE_LIST,
            topics,
            pageNum
        }
    },

};

 function create(state=initialState,action) {
    switch (action.type){
        case actionTypes.CREATE_ARTICLE:
            return[...state,...action.data];

        default:
            return  state;
    }
}

function detail(state=initialDetail,action) {
    switch (action.type){
        case actionTypes.RESPONSE_ARTICLE_DETAIL:
            return {...state, ...action.data};
        default:
            return  state;
    }
}

function list(state=initialList,action) {
    switch (action.type){
        case actionTypes.RESPONSE_ARTICLE_LIST:
            return {...state, ...action.data};
        default:
            return  state;
    }
}

export default  combineReducers({
    create:create,
    detail:detail,
    list:list
})
