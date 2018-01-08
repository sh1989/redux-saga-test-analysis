jest.mock('../api', () => ({
  getUser: (username, context) => ({ username, isAdmin: true, context })
}));

import SagaTester from 'redux-saga-tester';
import { call, put } from 'redux-saga/effects';
import { getUser } from '../api';
import { loadUserSaga, somethingElse } from '../saga';
import reducer, { defaultState, loadUser, LOAD_USER_SUCCESS } from '../state';

describe('with redux-saga-tester', () => {
  it('tests successful API request', () => {
    const user = { username: 'sam', isAdmin: true, context: 'test_app' };

    const sagaTester = new SagaTester({
      initialState: defaultState,
      reducers: reducer
    });

    sagaTester.start(loadUserSaga, loadUser('sam'));

    expect(sagaTester.wasCalled(LOAD_USER_SUCCESS)).toEqual(true);
    expect(sagaTester.getState()).toEqual({
      loading: false,
      result: user,
      error: null,
      context: 'test_app'
    });
  });
});
