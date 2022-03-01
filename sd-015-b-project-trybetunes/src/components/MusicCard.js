import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };

    this.addFavoriteSong = this.addFavoriteSong.bind(this);
    this.removeFavoriteSong = this.removeFavoriteSong.bind(this);
    this.addFavoriteSong = this.addFavoriteSong.bind(this);
  }

  verifyFavoriteSong(checked) {
    return checked ? this.addFavoriteSong() : this.removeFavoriteSong();
  }

  async addFavoriteSong() {
    const { song } = this.props;
    this.setState({
      loading: true,
    });
    await addSong(song);
    this.setState({
      loading: false,
    });
  }

  async removeFavoriteSong() {
    const { song } = this.props;
    this.setState({
      loading: true,
    });
    await removeSong(song);
    this.setState({
      loading: false,
    });
  }

  render() {
    const { loading } = this.state;
    const { song: { trackName, previewUrl, trackId } } = this.props;
    return (
      <div>
        {loading && <p>Carregando...</p>}
        <span>{ trackName }</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            type="checkbox"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ ({ target }) => {
              const { checked } = target;
              this.verifyFavoriteSong(checked);
            } }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
