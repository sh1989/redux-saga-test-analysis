import { expectSaga, testSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { call, put, select } from 'redux-saga/effects';
import { getUser } from '../api';
import { loadUserSaga } from '../saga';
import reducer, { getContext, loadUser, loadUserSuccess, loadUserFailure } from '../state';

describe('with redux-saga-test-plan', () => {
  const user = { username: 'sam', isAdmin: true, context: 'test_app' };
  const error = new Error("404 Not Found");

  describe('with a successful API request', () => {
    it('works as a unit test', () => {
      testSaga(loadUserSaga, loadUser('sam'))
        .next()
        .select(getContext)
        .next('tests')
        .call(getUser, 'sam', 'tests')
        .next(user)
        .put(loadUserSuccess(user))
        .next()
        .isDone();
    });

    it('works as an integration test', () => {
      return expectSaga(loadUserSaga, loadUser('sam'))
        .provide([
          [select(getContext), 'test_app'],
          [call(getUser, 'sam', 'test_app'), user]
        ])
        .put(loadUserSuccess(user))
        .run();
    });

    it('works as an integration test with reducer', () => {
      return expectSaga(loadUserSaga, loadUser('sam'))
        .withReducer(reducer)
        .provide([
          [call(getUser, 'sam', 'test_app'), user]
         ])
        .hasFinalState({
          loading: false,
          result: user,
          error: null,
          context: 'test_app'
        })
        .run();
    });
  });

  describe('with an unsuccessful API request', () => {
    it('works as a unit test', () => {
      testSaga(loadUserSaga, loadUser('sam'))
        .next()
        .select(getContext)
        .next('tests')
        .call(getUser, 'sam', 'tests')
        .throw(error)
        .put(loadUserFailure(error))
        .next()
        .isDone();
    });

    it('works as an integration test', () => {
      return expectSaga(loadUserSaga, loadUser('sam'))
        .provide([
          [select(getContext), 'test_app'],
          [call(getUser, 'sam', 'test_app'), throwError(error)]
        ])
        .put(loadUserFailure(error))
        .run();
    });

    it('works as an integration test with reducer', () => {
      return expectSaga(loadUserSaga, loadUser('sam'))
        .withReducer(reducer)
        .provide([
          [call(getUser, 'sam', 'test_app'), throwError(error)]
         ])
        .hasFinalState({
          loading: false,
          result: null,
          error: error,
          context: 'test_app'
        })
        .run();
    });
  });
});
