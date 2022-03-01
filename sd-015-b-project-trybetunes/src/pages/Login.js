import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isDisabled: true,
      loading: false,
      apiLoaded: false,
    };

    this.didMount = false;
    this.handleInput = this.handleInput.bind(this);
    this.enableBttn = this.enableBttn.bind(this);
    // this.handleOnClick = this.handleOnClick(this);
  }

  componentDidMount() {
    this.didMount = true;
  }

  componentWillUnmount() {
    this.didMount = false;
  }

  handleInput({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.enableBttn());
  }

  async handleOnClick(nome) {
    this.setState({ loading: true });
    await createUser({ name: nome });
    if (this.didMount) {
      this.setState({ apiLoaded: true });
    }
  }

  enableBttn() {
    const { name } = this.state;
    const minCaracters = 3;
    if (name.length >= minCaracters) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { name, isDisabled, loading, apiLoaded } = this.state;
    if (loading) {
      return (
        <div>
          <p>Carregando...</p>
          {apiLoaded ? <Redirect to="/search" /> : '' }
        </div>
      );
    } return (
      <div data-testid="page-login" className="login">
        <label htmlFor="login-name-input">
          Nome
          <input
            type="text"
            name="name"
            value={ name }
            data-testid="login-name-input"
            onChange={ this.handleInput }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ isDisabled }
          onClick={ () => this.handleOnClick(name) }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
