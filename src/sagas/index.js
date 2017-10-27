import {fork} from 'redux-saga/effects'
import {loginFlow, registerFlow, user_auth} from './loginSaga'

export default function* rootSaga() {
    yield  fork(loginFlow);
    yield  fork(registerFlow);
    yield  fork(user_auth);
}
