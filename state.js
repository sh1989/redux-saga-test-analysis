export const LOAD_USER = 'LOAD_USER';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const loadUser = username => ({
  type: LOAD_USER,
  payload: username
});

export const loadUserSuccess = user => ({
  type: LOAD_USER_SUCCESS,
  payload: user
});

export const loadUserFailure = error => ({
  type: LOAD_USER_FAILURE,
  payload: error
});

export const getContext = state => state.context;

export const defaultState = Object.freeze({
  loading: false,
  result: null,
  error: null,
  context: 'test_app'
});

function reducer(state = defaultState, action) {
  switch(action.type) {
    case LOAD_USER:
      return {
        loading: true,
        result: null,
        error: null,
        context: state.context
      };
    case LOAD_USER_SUCCESS:
      return {
        loading: false,
        result: action.payload,
        error: null,
        context: state.context
      };
    case LOAD_USER_FAILURE:
     return {
       loading: false,
       result: null,
       error: action.payload,
       context: state.context
     };
    default:
      return state;
  }
}

export default reducer;
