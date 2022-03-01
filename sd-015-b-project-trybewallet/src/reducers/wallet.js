import { SET_EXPENSES, SET_CURRENCIES, DELETE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  dataApi: {},
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case SET_CURRENCIES:
    return {
      ...state,
      dataApi: action.dataApi,
      currencies: action.keysApi,
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: action.newExpenses,
    };

  default:
    return state;
  }
};

export default wallet;
