import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import Filter from './components/Filter';

let haveTrunfo = false;
const estados = {
  cardName: '',
  cardDescription: '',
  cardAttr1: '',
  cardAttr2: '',
  cardAttr3: '',
  cardImage: '',
  cardRare: '',
  cardTrunfo: false,
  hasTrunfo: false,
  isSaveButtonDisabled: true,
  filterName: '',
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ...estados,
      listCards: [],
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.deletArray = this.deletArray.bind(this);
    // this.filterName = this.filterName.bind(this);
  }

  onInputChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState(({
      [name]: value,
    }), () => {
      const {
        cardName,
        cardDescription,
        cardImage,
        cardRare,
        cardAttr1,
        cardAttr2,
        cardAttr3,
      } = this.state;
      const inputs = [cardName, cardDescription, cardImage, cardRare]
        .every((all) => all !== '');

      const maxValue = 90;
      const minValue = 0;
      const maxSumValue = 210;
      const sum = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3);
      const verificaMaxSum = sum <= maxSumValue;
      const arrayValores = [cardAttr1, cardAttr2, cardAttr3]
        .some((element) => element < minValue || element > maxValue);

      if (inputs && !arrayValores && verificaMaxSum) {
        this.setState({ isSaveButtonDisabled: false });
      } else {
        this.setState({ isSaveButtonDisabled: true });
      }
    });
  }

  onSaveButtonClick(event) {
    event.preventDefault();
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.state;

    const cardObj = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };

    if (haveTrunfo) {
      this.setState({ ...estados, hasTrunfo: true });
    } else if (cardTrunfo) {
      haveTrunfo = true;
      this.setState({ ...estados, hasTrunfo: true });
    } else {
      this.setState({ ...estados });
    }

    this.setState((prevState) => ({
      listCards: [...prevState.listCards, cardObj],
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,

    }));
  }

  deletArray({ target }) {
    const { id } = target.previousSibling;
    const { listCards } = this.state;
    this.setState({
      listCards: listCards.filter((card) => card.cardName !== target.id),
    });
    if (id) {
      this.setState({
        hasTrunfo: false,
      });
    }
  }

  // filterName() {
  //   const { filterName, listCards } = this.state;
  //   listCards.filter((card) => card.cardName === filterName);
  // }

  render() {
    const {
      filterName,
      listCards,
    } = this.state;

    return (
      <div>
        <h1>Tryunfo</h1>
        <div className="div">
          <Form
            { ...this.state }
            onInputChange={ this.onInputChange }
            onSaveButtonClick={ this.onSaveButtonClick }
          />
          <Card
            { ...this.state }
            onInputChange={ this.onInputChange }
          />
        </div>
        <Filter
          { ...this.state }
          onInputChange={ this.onInputChange }
          // filterName={ this.filterName }
        />
        { !filterName ? listCards.map((card) => (
          <Card
            key={ card.cardName }
            { ...card }
            isTrue
            deletArray={ this.deletArray }
          />)) : listCards.filter((card) => card.cardName.includes(filterName))
          .map((card1) => (<Card
            key={ card1.cardName }
            { ...card1 }
            isTrue
            deletArray={ this.deletArray }
          />))}
      </div>
    );
  }
}

export default App;
