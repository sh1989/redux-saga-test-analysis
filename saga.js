import { call, put, select, takeEvery } from 'redux-saga/effects';
import { getUser } from './api';
import { getContext, LOAD_USER, loadUserSuccess, loadUserFailure } from './state';

export function* loadUserSaga(action) {
  try {
    const context = yield select(getContext);
    const user = yield call(getUser, action.payload, context);
    yield put(loadUserSuccess(user));
  } catch (error) {
    yield put(loadUserFailure(error));
  }
}

function* watcher() {
  yield takeEvery(LOAD_USER, loadUserSaga);
}

export default watcher;
