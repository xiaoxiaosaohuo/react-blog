const initialState = [];

export const actionTypes = {
    CREATE_ARTICLE:"CREATE_ARTICLE",

};

export const actions = {
    createArticle: function (data) {
        return {
            type: actionTypes.CREATE_ARTICLE,
            data
        }
    },

};

export function reducer(state=initialState,action) {
    switch (action.type){
        case actionTypes.CREATE_ARTICLE:
            return[...state,...action.data];
        default:
            return  state;
    }
}
