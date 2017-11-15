import {combineReducers} from 'redux'

const initialState = [];
const initialDetail = {}
export const actionTypes = {
    CREATE_ARTICLE:"CREATE_ARTICLE",
    GET_ARTICLE_DETAIL: "GET_ARTICLE_DETAIL",
    RESPONSE_ARTICLE_DETAIL: "RESPONSE_ARTICLE_DETAIL"

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
    }

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

export default  combineReducers({
    create:create,
    detail:detail,
})
