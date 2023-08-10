/* eslint-disable default-param-last */
/* eslint-disable prefer-object-spread */
const initialState = {
  isLoading: false
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return Object.assign({}, state, { isLoading: action.payload });
    default:
      return state;
  }
};

export default loadingReducer;
