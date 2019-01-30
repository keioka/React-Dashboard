import fromGenerator from 'redux-saga-test';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import sinon from 'sinon';
import { fetchEntity } from './helper';

const actions = {
  request: () => ({
    type: 'REQUEST',
  }),
  success: response => ({
    type: 'SUCCESS',
    payload: response,
  }),
  error: response => ({
    type: 'ERROR',
    payload: response,
  }),
};

const apiCallSuccess = id => Promise.resolve({ name: 'Tucker' });
const apiCallError = id => Promise.reject({ message: 'Error' });

describe('fetchEntity', () => {
  it('should return success', () => expectSaga(fetchEntity, actions, apiCallSuccess, 42)
    .put({
      type: 'SUCCESS',
      payload: { id: 42, response: { name: 'Tucker' } },
    })
    .run());

  it('should return error', () => expectSaga(fetchEntity, actions, apiCallError, 42)
    .put({
      type: 'ERROR',
      payload: { id: 42, error: { message: 'Error' } },
    })
    .run());
  //
  // // Dispatch any actions that the saga will `take`.
  //   .dispatch({ type: 'REQUEST_USER', payload: 42 })
});
