import {
  call, all, fork, takeLatest, put,
} from 'redux-saga/effects';

import { authSaga } from '@redux/auth';
import { postSaga } from '@redux/post';
import { clientStatusSaga } from '@redux/clientStatus';

export default function* sagas() {
  yield all([fork(authSaga), fork(clientStatusSaga), fork(postSaga)]);
}
