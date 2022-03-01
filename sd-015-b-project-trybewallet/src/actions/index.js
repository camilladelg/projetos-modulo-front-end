export const SET_EMAIL = 'SET_EMAIL';
export const SET_EXPENSES = 'SET_EXPENSES';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';

export const setEmail = (payload) => ({
  type: SET_EMAIL,
  payload,
});

export const setExpenses = (payload) => ({
  type: SET_EXPENSES,
  payload,
});

export const setCurrencies = (dataApi, keysApi) => ({
  type: SET_CURRENCIES,
  dataApi,
  keysApi,
});

export const deleteExpenses = (newExpenses) => ({
  type: DELETE_EXPENSES,
  newExpenses,
});

export const fetchDataApi = () => async (dispatch) => {
  try {
    const data = await fetch('https://economia.awesomeapi.com.br/json/all');
    const dataApi = await data.json();
    const keysApi = Object.keys(dataApi).filter((moeda) => moeda !== 'USDT');
    dispatch(setCurrencies(dataApi, keysApi));
  } catch (err) {
    console.log(err);
  }
};
