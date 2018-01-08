# Redux-Saga Test Analysis

This repository is the backing code for a [blog post](http://samhogy.co.uk/2018/01/evaluating-redux-saga-test-libraries.html) which is comparing and contrasting various libraries for testing redux sagas.

It a trivial saga and a reducer, with tests written using the following libraries:

* "Native" testing (i.e without a helper library)
* [redux-saga-tester](https://github.com/wix/redux-saga-tester)
* [redux-saga-test](https://github.com/stoeffel/redux-saga-test)
* [redux-saga-testing](https://github.com/antoinejaussoin/redux-saga-testing/)
* [redux-saga-test-plan](https://github.com/jfairbank/redux-saga-test-plan)
* [redux-saga-test-engine](https://github.com/DNAinfo/redux-saga-test-engine)

The tests are written using Jest, which provides deep-equals equality checking by default. Where possible, the tests are written using the `cloneableGenerator` utility from Redux Saga, so that we can demonstrate the possibility of minimizing duplication in branching logic.
