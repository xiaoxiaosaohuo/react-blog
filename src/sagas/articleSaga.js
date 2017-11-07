import {put, take, call, fork} from 'redux-saga/effects'
import {get, post} from '../fetch'
import {actionsTypes as IndexActionTypes} from '../reducers'
import {actionTypes as ArticleTypes} from '../reducers/article'


export function* createArticle (data) {
    yield put({type:IndexActionTypes.FETCH_START});
    try {
        return yield call(post, '/article/createArticle', data)
    } catch (error) {
        yield put({type:IndexActionTypes.SET_MESSAGE,msg:'注册失败',success:false});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END});
    }
}



export function* createArticleFlow () {
    while(true){
        let request = yield take(ArticleTypes.CREATE_ARTICLE);
        console.log(request);
        let response = yield call(createArticle, request.data);
        if(response&&response.code === 0){
            yield put({type:IndexActionTypes.SET_MESSAGE,msg:'注册成功!',success:true});
            yield put({type:IndexActionTypes.RESPONSE_USER_INFO,data:response.data})
        }

    }
}
