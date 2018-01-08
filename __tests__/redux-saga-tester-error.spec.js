jest.mock('../api', () => ({
  getUser: (username, context) => { throw new Error('oh no'); }
}));

import SagaTester from 'redux-saga-tester';
import { call, put } from 'redux-saga/effects';
import { getUser } from '../api';
import { loadUserSaga, somethingElse } from '../saga';
import reducer, { defaultState, loadUser, LOAD_USER_FAILURE } from '../state';

describe('with redux-saga-tester', () => {
  it('tests unsuccessful API request', () => {
    const user = { username: 'sam', isAdmin: true, context: 'test_app' };

    const sagaTester = new SagaTester({
      initialState: defaultState,
      reducers: reducer
    });

    sagaTester.start(loadUserSaga, loadUser('sam'));

    expect(sagaTester.wasCalled(LOAD_USER_FAILURE)).toEqual(true);
    expect(sagaTester.getState()).toEqual({
      loading: false,
      result: null,
      error: new Error('oh no'),
      context: 'test_app'
    });
  });
});
