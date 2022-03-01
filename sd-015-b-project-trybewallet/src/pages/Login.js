import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      isDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(({ [name]: value }), () => {
      const { email, senha } = this.state;
      const minLength = 6;
      const validEmail = email.includes('@') && email.includes('.com');
      if (validEmail && senha.length >= minLength) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { history, dispatchSetEmail } = this.props;
    const { email } = this.state;
    dispatchSetEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, senha, isDisabled } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="senha">
          Senha:
          <input
            type="password"
            id="senha"
            data-testid="password-input"
            name="senha"
            value={ senha }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          disabled={ isDisabled }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatchSetEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSetEmail: (state) => dispatch(setEmail(state)),
});

export default connect(null, mapDispatchToProps)(Login);
