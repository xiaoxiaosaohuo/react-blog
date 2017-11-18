import {fork} from 'redux-saga/effects'
import {loginFlow, registerFlow, user_auth} from './loginSaga'
import {createArticleFlow,getArticleDetailFlow,getArticlesListFlow} from './articleSaga'
export default function* rootSaga() {
    yield  fork(loginFlow);
    yield  fork(registerFlow);
    yield  fork(user_auth);
    yield  fork(createArticleFlow);
    yield  fork(getArticleDetailFlow);
    yield fork(getArticlesListFlow);
}
