import { createTypes, actionCreator, async } from 'redux-action-creator';
import uniqBy from 'lodash/uniqBy';
import {
  call, all, fork, takeLatest, put,
} from 'redux-saga/effects';
import { fetchEntity } from '../helper';
import * as api from '../api';
/** ******************************
  Action Types
******************************* */

export const TypesFetch = createTypes(
  [...async('REQUEST'), ...async('SUCCESS'), ...async('ERROR')],
  '@POST/FETCH',
);

/** ******************************
  Actions
******************************* */

export const actions = {
  fetchPost: actionCreator(TypesFetch.REQUEST),
  success: actionCreator(TypesFetch.SUCCESS, 'response'),
  error: actionCreator(TypesFetch.ERROR, 'error'),
};

/** ******************************
  Reducer
******************************* */

const intialState = {
  isLoading: false,
  all: [
    {
      id: 12,
      title: 'How does this work?',
      author: 'typicode',
    },
  ],
};

export default function reducer(state = intialState, action = {}) {
  switch (action.type) {
    case TypesFetch.REQUEST: {
      return Object.assign({}, state, { isLoading: true });
    }

    case TypesFetch.SUCCESS: {
      return Object.assign({}, state, {
        isLoading: false,
        all: uniqBy([...state.all, ...action.payload.response], 'id'),
      });
    }

    case TypesFetch.ERROR: {
      return Object.assign({}, state, {
        isLoading: false,
        error: {
          message: actions.payload.error,
        },
      });
    }

    default:
      return state;
  }
}

/** ******************************
  Saga
******************************* */

const fetchPost = fetchEntity.bind(null, actions, api.fetchPost);

function* watchFetchPost() {
  yield takeLatest(TypesFetch.REQUEST, fetchPost);
}

function* sagas() {
  console.log('PostSaga is working');
  yield all([fork(watchFetchPost)]);
}

export const postSaga = sagas;
