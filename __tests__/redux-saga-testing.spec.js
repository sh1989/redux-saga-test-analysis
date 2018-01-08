import sagaHelper from 'redux-saga-testing';
import { call, put, select } from 'redux-saga/effects';
import { getUser } from '../api';
import { loadUserSaga } from '../saga';
import { getContext, loadUser, loadUserSuccess, loadUserFailure } from '../state';

describe('with redux-saga-testing', () => {
  const user = { username: 'sam', isAdmin: true };

  describe('and the request is successful', () => {
    const it = sagaHelper(loadUserSaga(loadUser('sam')));

    it('gets the execution context', result => {
      expect(result).toEqual(select(getContext));
      return 'test_app';
    });

    it('calls the API', result => {
      expect(result).toEqual(call(getUser, 'sam', 'test_app'));
      return user;
    });

    it('raises success action', result => {
      expect(result).toEqual(put(loadUserSuccess(user)));
    });

    it('performs no further work', result => {
      expect(result).not.toBeDefined();
    });
  });

  describe('and the request fails', () => {
    const it = sagaHelper(loadUserSaga(loadUser('sam')));
    const error = new Error("404 Not Found");

    it('gets the execution context', result => {
      expect(result).toEqual(select(getContext));
      return 'test_app';
    });

    it('calls the API', result => {
      expect(result).toEqual(call(getUser, 'sam', 'test_app'));
      return error;
    });

    it('raises failed action', result => {
      expect(result).toEqual(put(loadUserFailure(error)));
    });

    it('performs no further work', result => {
      expect(result).not.toBeDefined();
    });
  });
});
