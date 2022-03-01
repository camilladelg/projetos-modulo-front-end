import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setExpenses, fetchDataApi } from '../actions';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatchFetchDataApi } = this.props;
    dispatchFetchDataApi();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { dispatchSetExpenses, dataApi, dispatchFetchDataApi } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    const exchangeRates = dataApi;
    const expenses = { id, value, description, currency, method, tag, exchangeRates };
    dispatchFetchDataApi();
    dispatchSetExpenses(expenses);
    this.setState({
      id: id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  createCurrency() {
    const { currency } = this.state;
    const { currencies } = this.props;
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          id="currency"
          name="currency"
          data-testid="currency-input"
          onChange={ this.handleChange }
          value={ currency }
        >
          { currencies.map(
            (moeda) => (
              <option
                key={ moeda }
                data-testid={ moeda }
                value={ moeda }
              >
                {moeda}
              </option>),
          ) }
        </select>
      </label>
    );
  }

  createTag() {
    const { tag } = this.state;
    return (
      <label htmlFor="tag">
        Classificação:
        <select
          id="tag"
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </label>
    );
  }

  render() {
    const { value, description, method } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="value">
          Valor:
          <input
            id="value"
            type="text"
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            id="description"
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        {this.createCurrency()}
        <label htmlFor="method">
          Forma de Pagamento:
          <select
            id="method"
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        {this.createTag()}

        <button type="submit">Adicionar despesa</button>
      </form>
    );
  }
}

Form.propTypes = {
  dispatchSetExpenses: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatchFetchDataApi: PropTypes.func.isRequired,
  dataApi: PropTypes.objectOf(PropTypes.object),
};

Form.defaultProps = {
  dataApi: {},
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSetExpenses: (state) => dispatch(setExpenses(state)),
  dispatchFetchDataApi: () => dispatch(fetchDataApi()),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  dataApi: state.wallet.dataApi,
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
