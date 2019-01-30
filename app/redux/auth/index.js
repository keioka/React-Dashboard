import { createTypes, actionCreator, async } from 'redux-action-creator';
import {
  call, all, fork, takeLatest, put,
} from 'redux-saga/effects';

/** ******************************
  Action Types
******************************* */

export const TypesLogin = createTypes(
  [...async('REQUEST'), ...async('SUCCESS'), ...async('ERROR')],
  '@AUTH/LOGIN',
);
export const TypesSignup = createTypes(
  [...async('REQUEST'), ...async('SUCCESS'), ...async('ERROR')],
  '@AUTH/SIGNUP',
);

/** ******************************
  Actions
******************************* */

export const actions = {
  login: actionCreator(TypesLogin.REQUEST),
  signup: actionCreator(TypesSignup.REQUEST, 'car'),
};

/** ******************************
  Reducer
******************************* */

const intialState = {
  isRequesting: false,
  isLogined: true,
  userInfo: {
    firstName: '',
    lastName: '',
  },
  user: {
    age: 24,
    organization: '',
  },
  credentials: {
    accessToken: 'Kofeds22zwqxwsew_2ds42DfaCds2',
  },
};

export default function reducer(state = intialState, action = {}) {
  switch (action.type) {
    case TypesLogin.REQUEST: {
      return state;
    }

    case TypesLogin.SUCCESS: {
      return state;
    }

    case TypesLogin.ERROR: {
      return state;
    }

    default:
      return state;
  }
}

/** ******************************
  Saga
******************************* */

function getTweets() {
  return fetch('http://google.com');
}

function* fetchTweets(action) {
  try {
    const tweets = yield call(getTweets);
    yield put({ type: 'FETCH_TWEETS_SUCCESS', payload: tweets });
  } catch (e) {
    yield put({ type: 'FETCH_TWEETS_ERROR', message: e.message });
  }
}

function* watchFetchTweets() {
  yield takeLatest('FETCH_TWEETS_REQUEST', fetchTweets);
}

function* sagas() {
  yield all([fork(watchFetchTweets)]);
}

export const authSaga = sagas;
