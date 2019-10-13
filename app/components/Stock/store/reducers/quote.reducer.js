import * as Actions from '../actions';

const initialState = {
  data: {},
  isLoading: false,
  error: null,
};

const quoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_QUOTE:
      console.log('Actions.GET_QUOTE', action.payload);
      return { ...state, isLoading: true };
    case Actions.GET_QUOTE_SUCCESS:
      return { ...state, data: action.payload, isLoading: false };
    case Actions.GET_QUOTE_ERROR:
      return { ...state, isLoading: true, error: action.payload };
    default:
      return state;
  }
};

export default quoteReducer;
