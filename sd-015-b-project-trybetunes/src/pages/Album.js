import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import musicsAPI from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayMusics: [],
      resolve: false,
      loading: false,
      arrFavoritesSongs: [],
    };

    this.getArtistAndAlbun = this.getArtistAndAlbun.bind(this);
    this.checkInput = this.checkInput.bind(this);
  }

  componentDidMount() {
    this.getMusics();
    this.favoritsMusics();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { arrFavoritesSongs } = this.state;
    if (prevState.arrFavoritesSongs !== arrFavoritesSongs) {
      this.checkInput();
    }
  }

  async getMusics() {
    const { match: { params: { id } } } = this.props;
    const getArrayMusic = await musicsAPI(id);
    this.setState({
      arrayMusics: getArrayMusic,
      resolve: true,

    });
  }

  getArtistAndAlbun() {
    const { arrayMusics, resolve } = this.state;
    if (resolve) {
      const { artistName, collectionName, artworkUrl100 } = arrayMusics[0];
      return (
        <div>
          <img src={ artworkUrl100 } alt={ artistName } />
          <h2 data-testid="album-name">{collectionName}</h2>
          <p data-testid="artist-name">{artistName}</p>
        </div>
      );
    }
  }

  async favoritsMusics() {
    this.setState({
      loading: true,
    });
    const getFavoritsMusics = await getFavoriteSongs();
    this.setState({
      arrFavoritesSongs: getFavoritsMusics,
      loading: false,
    });
  }

  checkInput() {
    const { arrFavoritesSongs } = this.state;
    arrFavoritesSongs.forEach(({ trackId }) => {
      const favoriteSong = document.getElementById(trackId);
      if (favoriteSong) {
        favoriteSong.checked = true;
      }
    });
  }

  render() {
    const { arrayMusics, loading } = this.state;
    return (
      <div data-testid="page-album">
        {loading && <p>Carregando...</p>}
        <Header />
        {this.getArtistAndAlbun()}
        { arrayMusics.slice(1).map((song) => (
          <MusicCard
            key={ song.trackId }
            song={ song }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
