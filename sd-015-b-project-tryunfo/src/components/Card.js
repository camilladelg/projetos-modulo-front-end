import React from 'react';
import PropTypes from 'prop-types';
// Requisito 3

class Card extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      isTrue,
      deletArray,
    } = this.props;

    return (
      <div>
        <div>
          <h3 data-testid="name-card">
            { cardName }
          </h3>
          <img data-testid="image-card" src={ cardImage } alt={ cardName } />
          <p data-testid="description-card">
            { `Descrição da carta: ${cardDescription}` }
          </p>
          <p data-testid="attr1-card">{ `Atributo1: ${cardAttr1}` }</p>
          <p data-testid="attr2-card">{ `Atributo2: ${cardAttr2}` }</p>
          <p data-testid="attr3-card">{ `Atributo3: ${cardAttr3}` }</p>
          <p data-testid="rare-card">{ `Raridade: ${cardRare}` }</p>
          {cardTrunfo ? (
            <p data-testid="trunfo-card" id="trunfo-card">Super Trunfo</p>) : cardTrunfo }
          {isTrue && (
            <button
              type="button"
              id={ cardName }
              data-testid="delete-button"
              onClick={ deletArray }
            >
              Excluir
            </button>
          )}
        </div>
      </div>
    );
  }
}

Card.propTypes = PropTypes.shape({
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
  isTrue: PropTypes.bool,
  deletArray: PropTypes.func,
}).isRequired;

export default Card;
