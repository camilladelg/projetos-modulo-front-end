import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = ({
      name: '',
      loading: true,
    });
  }

  componentDidMount() {
    this.getUser1();
  }

  async getUser1() {
    const getUserName = await getUser();
    const { name } = getUserName;
    this.setState({ name, loading: false });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <div>
        <header data-testid="header-component"><p>TrybeTunes</p></header>
        {loading ? <p>Carregando...</p> : <p data-testid="header-user-name">{name}</p>}
        <nav>
          <Link to="/search" data-testid="link-to-search"> Pesquisa </Link>
          <Link to="/favorites" data-testid="link-to-favorites"> Favoritos </Link>
          <Link to="/profile" data-testid="link-to-profile"> Perfil </Link>
        </nav>
      </div>
    );
  }
}

export default Header;
