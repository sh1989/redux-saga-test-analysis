import fromGenerator from 'redux-saga-test';
import { cloneableGenerator } from 'redux-saga/utils';
import { call, put, select } from 'redux-saga/effects';
import { getUser } from '../api';
import { loadUserSaga } from '../saga';
import { getContext, loadUser, loadUserSuccess, loadUserFailure } from '../state';

// Bind Jest's deep equals function to a form the library expects
const assertions = {
  deepEqual: (a, b) => expect(a).toEqual(b)
};

describe('with redux-saga-test', () => {
  const generator = cloneableGenerator(loadUserSaga)(loadUser('sam'));
  const expect = fromGenerator(assertions, generator);
  const user = { username: 'sam', isAdmin: true };

  it('gets the execution context', () => {
    expect.next().select(getContext);
  });

  it('gets the user', () => {
    expect.next('test_app').call(getUser, 'sam', 'test_app');
  });

  describe('and the request is successful', () => {
    let expect;

    beforeAll(() => {
      expect = fromGenerator(assertions, generator.clone());
    });

    it('raises the success action', () => {
      expect.next(user).put(loadUserSuccess(user));
    });

    it('performs no further work', () => {
      expect.next().returns();
    });
  });

  describe('and the request fails', () => {
    let expect;
    const error = new Error("404 Not Found");

    beforeAll(() => {
      expect = fromGenerator(assertions, generator.clone());
    });

    it('raises the failed action', () => {
      expect.throwNext(error).put(loadUserFailure(error));
    });

    it('performs no further work', () => {
      expect.next().returns();
    });
  });
});
