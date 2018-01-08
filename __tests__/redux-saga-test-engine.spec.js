import { createSagaTestEngine, throwError } from 'redux-saga-test-engine';
import { call, put, select } from 'redux-saga/effects';
import { getUser } from '../api';
import { loadUserSaga } from '../saga';
import { getContext, loadUser, loadUserSuccess, loadUserFailure } from '../state';

describe('with redux-saga-test-engine', () => {
  describe('and a successful API request', () => {
    const user = { username: 'sam', isAdmin: true };
    const collectEffects = createSagaTestEngine(['PUT', 'CALL']);
    const actualEffects = collectEffects(
      loadUserSaga,
      [
        [select(getContext), 'test_app'],
        [call(getUser, 'sam', 'test_app'), user]
      ],
      loadUser('sam')
    );

    it('gets the user', () => {
      expect(actualEffects[0]).toEqual(call(getUser, 'sam', 'test_app'));
    });

    it('raises the success action', () => {
      expect(actualEffects[1]).toEqual(put(loadUserSuccess(user)));
    });

    it('performs no further work', () => {
      expect(actualEffects.length).toEqual(2);
    });
  });

  describe('and a successful API request', () => {
    const error = new Error("404 Not Found");
    const collectEffects = createSagaTestEngine(['PUT', 'CALL']);
    const actualEffects = collectEffects(
      loadUserSaga,
      [
        [select(getContext), 'test_app'],
        [call(getUser, 'sam', 'test_app'), throwError(error)]
      ],
      loadUser('sam')
    );

    it('gets the user', () => {
      expect(actualEffects[0]).toEqual(call(getUser, 'sam', 'test_app'));
    });

    it('raises the failure action', () => {
      expect(actualEffects[1]).toEqual(put(loadUserFailure(error)));
    });

    it('performs no further work', () => {
      expect(actualEffects.length).toEqual(2);
    });
  });
});
