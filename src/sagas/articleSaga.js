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

export function* getArticleDetail (data) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/article/getArticleDetail?id=${data.id}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msg: '网络请求错误', success: false});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* getArticleDetailFlow () {
    while (true){
        let req = yield take(ArticleTypes.GET_ARTICLE_DETAIL);
        let res = yield call(getArticleDetail,req.data);
        if(res){
            if(res.code === 0){
                yield put({type: ArticleTypes.RESPONSE_ARTICLE_DETAIL,msg:"请求成功",data:res.data,success:true});
            }else{
                yield put({type: IndexActionTypes.SET_MESSAGE, msg: res.message, success:false });
            }
        }
    }
}
