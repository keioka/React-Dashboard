import {
  call, all, fork, takeLatest, put,
} from 'redux-saga/effects';

export function* fetchEntity(action, apiFn, id, url) {
  try {
    const response = yield call(apiFn, url || id);
    yield put(action.success({ id, response }));
  } catch (error) {
    yield put(action.error({ id, error }));
  }
}
