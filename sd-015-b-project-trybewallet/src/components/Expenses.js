import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenses } from '../actions';

class Expenses extends React.Component {
  constructor() {
    super();

    this.deleteExpense = this.deleteExpense.bind(this);
  }

  deleteExpense(id) {
    const { expenses, dispatchSetExpenses } = this.props;

    const newExpenses = expenses.filter((element) => element.id !== id);

    dispatchSetExpenses(newExpenses);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses
            .map(({ id, currency, description, tag, method, value, exchangeRates }) => {
              const eachCurrency = exchangeRates[currency];
              return (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{eachCurrency.name.split('/')[0]}</td>
                  <td>{parseFloat(eachCurrency.ask).toFixed(2)}</td>
                  <td>{value}</td>
                  <td>{(value * eachCurrency.ask).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      id={ id }
                      onClick={ () => this.deleteExpense(id) }
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

    );
  }
}

Expenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  dispatchSetExpenses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSetExpenses: (state) => dispatch(deleteExpenses(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
