import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { getEmail, getCurrency } = this.props;
    return (
      <div>
        <h3 data-testid="email-field">{ getEmail }</h3>
        <span data-testid="total-field">
          {'Valor Total: R$ '}
          {getCurrency.reduce((acc, { value, currency, exchangeRates }) => {
            const total = acc + (value * exchangeRates[currency].ask);
            return parseFloat(total.toFixed(2));
          }, 0)}
        </span>
        <p data-testid="header-currency-field"> BRL </p>
      </div>
    );
  }
}

Header.propTypes = {
  getEmail: PropTypes.string.isRequired,
  getCurrency: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};

const mapStateToProps = (state) => ({
  getEmail: state.user.email,
  getCurrency: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
