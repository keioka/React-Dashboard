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

/** ******************************
  Saga
******************************* */

function* watchClientStatusLogin() {
  const channel = eventChannel((emitter) => {
    try {
      const changeStatus = (status) => {
        emitter({ type: TypesOnline.CHANGE, status });
      };

      window.addEventListener('offline', changeStatus(false), false);
      window.addEventListener('online', changeStatus(true), false);

      // Return an unsubscribe method
      return () => {
        // Perform any cleanup you need here
        window.removeEventListener('offline', changeStatus);
        window.removeEventListener('online', changeStatus);
      };
    } catch (e) {
      console.log(e);
    }
  });

  while (true) {
    const { data } = yield take(channel);
  }
}

function* sagas() {
  console.log('clientStatusSaga is working');
  yield all([fork(watchClientStatusLogin)]);
}

export const clientStatusSaga = sagas;
