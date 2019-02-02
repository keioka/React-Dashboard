import { createTypes, actionCreator, async } from 'redux-action-creator';
import {
  call, all, fork, take, takeLatest, put,
} from 'redux-saga/effects';

import { eventChannel } from 'redux-saga';

/** ******************************
  Action Types
******************************* */

export const TypesOnline = createTypes([...async('CHANGE')], '@CLIENT_STATUS/ONLINE');

/** ******************************
  Actions
******************************* */

export const actions = {
  changeOnlineStatus: actionCreator(TypesOnline.CHANGE, 'status'),
};

/** ******************************
  Reducer
******************************* */

const intialState = {
  isOnline: true,
};

export default function reducer(state = intialState, action = {}) {
  switch (action.type) {
    case TypesOnline.CHANGE: {
      const { status } = action.payload;
      return Object.assign(
        {},
        {
          isOnline: status,
        },
      );
    }

    default:
      return state;
  }
}

/********************************
  Saga
********************************/

function clientOnlineStatusChannel() {
  return eventChannel((emitter) => {
    try {
      const emmiterOffline = () => emitter(false);
      const emmiterOnline = () => emitter(true);

      window.addEventListener('offline', emmiterOffline);
      window.addEventListener('online', emmiterOnline);

      return () => {
        window.removeEventListener('offline', emmiterOffline);
        window.removeEventListener('online', emmiterOnline);
      };
    } catch (e) {
      console.error(e);
    }
  });
}

function* clientOnlineStatusSaga() {
  const channel = yield call(clientOnlineStatusChannel)
  try {
    while (true) {
      const data = yield take(channel);
      yield put({ type: TypesOnline.CHANGE, payload: { status: data }});
    }
  } catch(e) {
    console.error(e)
  }
}

function* sagas() {
  console.log('clientStatusSaga is working');
  yield all([fork(clientOnlineStatusSaga)]);
}

export const clientStatusSaga = sagas;
