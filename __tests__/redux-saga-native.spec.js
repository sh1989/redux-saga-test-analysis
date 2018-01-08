import { call, put, select } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { getUser } from '../api';
import { loadUserSaga } from '../saga';
import { getContext, loadUser, loadUserSuccess, loadUserFailure } from '../state';

describe('with redux-saga native testing', () => {
  const generator = cloneableGenerator(loadUserSaga)(loadUser('sam'));
  const user = { username: 'sam', isAdmin: true };

  it('gets the execution context', () => {
    const result = generator.next().value;
    expect(result).toEqual(select(getContext));
  });

  it('calls the API', () => {
    const result = generator.next('tests').value;
    expect(result).toEqual(call(getUser, 'sam', 'tests'));
  });

  describe('and the request is successful', () => {
    let clone;

    beforeAll(() => {
      clone = generator.clone();
    });

    it('raises success action', () => {
      const result = clone.next(user).value;
      expect(result).toEqual(put(loadUserSuccess(user)));
    });

    it('performs no further work', () => {
      const result = clone.next().done;
      expect(result).toBe(true);
    });
  });

  describe('and the request fails', () => {
    let clone;

    beforeAll(() => {
      clone = generator.clone();
    });

    it('raises failed action', () => {
      const error = new Error("404 Not Found");
      const result = clone.throw(error).value;
      expect(result).toEqual(put(loadUserFailure(error)));
    });

    it('performs no further work', () => {
      const result = clone.next().done;
      expect(result).toBe(true);
    });
  });
});
