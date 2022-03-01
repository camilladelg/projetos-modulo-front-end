import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = ({
      artistName: '',
      searchArtist: '',
      isDisabled: true,
      albuns: [],
      loading: false,
      resolve: false,
    });

    this.handleInput = this.handleInput.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.renderArtistAlbum = this.renderArtistAlbum.bind(this);
  }

  handleInput({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.enableBttn());
  }

  async handleOnClick(music) {
    const { artistName } = this.state;
    this.setState({
      loading: true,
      searchArtist: artistName,
    });
    const searchAlbuns = await searchAlbumsAPI(music);
    this.setState({
      albuns: searchAlbuns,
      artistName: '',
      loading: false,
      resolve: true,
    });
  }

  enableBttn() {
    const { artistName } = this.state;
    const minCaracter = 2;
    if (artistName.length >= minCaracter) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  renderArtistAlbum() {
    const { albuns, searchArtist, resolve } = this.state;
    if (resolve && albuns.length === 0) {
      return <p>Nenhum álbum foi encontrado</p>;
    } if (resolve) {
      console.log(albuns);
      return (
        <div>
          <h1>
            { `Resultado de álbuns de: ${searchArtist}`}
          </h1>
          {albuns.map((album, index) => (
            <div key={ album.collectionId }>
              <img src={ album.artworkUrl100 } alt={ `Imagem do Album ${index + 1}` } />
              <p>{ album.collectionName }</p>
              <p>{ album.artistName }</p>
              <Link
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `/album/${album.collectionId}` }
              >
                {`Album ${index + 1}`}
              </Link>
            </div>
          ))}
        </div>
      );
    }
  }

  render() {
    const { artistName, isDisabled, loading } = this.state;
    return (
      <div data-testid="page-search">
        {loading && <p>Carregando...</p>}
        <Header />
        <input
          type="text"
          name="artistName"
          value={ artistName }
          placeholder="Nome do Artista"
          data-testid="search-artist-input"
          onChange={ this.handleInput }
        />
        <button
          type="button"
          disabled={ isDisabled }
          data-testid="search-artist-button"
          onClick={ () => this.handleOnClick(artistName) }
        >
          Pesquisar
        </button>
        {this.renderArtistAlbum()}
      </div>

    );
  }
}

export default Search;
