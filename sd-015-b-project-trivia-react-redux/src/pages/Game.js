import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuestions } from '../redux/actions/gameAction';
import { savePlayers, setAnswers, setScore } from '../redux/actions/resultsAction';
import getGravatar from '../services/gravatar';
import './game.css';
import logo from '../trivia.png';

class Game extends Component {
  constructor() {
    super();
    this.state = { answer: '',
      answerIndex: 0,
      isVerified: false,
      timer: 30,
      assertions: 0,
      score: 0,
      styleBtn: { display: 'none' },
    };

    this.renderQuestions = this.renderQuestions.bind(this);
    this.renderAnswer = this.renderAnswer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.verifyAnswer = this.verifyAnswer.bind(this);
    this.createTimer = this.createTimer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    const { dispatchGetQuestions, token } = this.props;
    const { timer } = this.state;
    dispatchGetQuestions(token);
    this.createTimer();
    const state = { player: { name: '', assertions: 0, score: 0, gravatarEmail: '' } };
    localStorage.setItem('state', JSON.stringify(state));
    const TIME_LIMIT = 0;
    if (timer === TIME_LIMIT) clearInterval(this.gameTimer);
  }

  componentDidUpdate() {
    const { userName, userEmail } = this.props;
    const { assertions, score, timer } = this.state;
    const TIME_LIMIT = 0;
    if (timer === TIME_LIMIT) clearInterval(this.gameTimer);
    const state = { player: { name: userName, assertions, score, gravatarEmail: userEmail,
    } };
    localStorage.setItem('state', JSON.stringify(state));
  }

  handleClick({ target }) {
    const { value } = target;
    this.setState({ answer: value, styleBtn: { display: 'block' } }, () => {
      this.verifyAnswer();
      this.countCorrectAnswers();
    });
    clearInterval(this.gameTimer);
  }

  nextQuestion() {
    const { answerIndex, score } = this.state;
    const { questions, history, dispatchScore } = this.props;
    if (answerIndex === questions.length - 1) {
      dispatchScore(score);
      history.push('/feedback');
    }
    this.setState({ answer: '',
      isVerified: false,
      answerIndex: answerIndex + 1,
      timer: 30,
      styleBtn: { display: 'none' },
    }, () => { dispatchScore(score); });

    this.createTimer();
  }

  verifyAnswer() {
    const { answer } = this.state;
    if (answer !== '') { this.setState({ isVerified: true }); }
  }

  createTimer() {
    const ONE_SECOND = 1000;
    this.gameTimer = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, ONE_SECOND);
  }

  countCorrectAnswers() {
    const { answer, answerIndex, timer } = this.state;
    const { questions, dispatchCorrectAnswers } = this.props;
    const levelsList = { hard: 3, medium: 2, easy: 1 };
    let level;
    const { difficulty } = questions[answerIndex];
    const baseScore = 10;
    if (difficulty === 'hard') {
      level = levelsList.hard;
    } else if (difficulty === 'medium') {
      level = levelsList.medium;
    } else { level = levelsList.easy; }
    if (answer === 'correct-answer') {
      const computation = baseScore + (timer + level);
      this.setState((prevState) => ({
        assertions: prevState.assertions + 1,
        score: prevState.score + computation,
      }), () => dispatchCorrectAnswers(answer));
    }
  }

  renderQuestions() {
    const { questions } = this.props;
    const { answerIndex, isVerified } = this.state;
    return (
      questions.length > 0
      && questions.map((element, index) => (
        answerIndex === index && ( // requisito 6 - o ternário faz renderizar uma questão de cada vez
          <>
            <h3 data-testid="question-category" className="font-question">
              { element.category }
            </h3>
            <p data-testid="question-text" className="font-question">
              { element.question }
            </p>
            { this.renderAnswer(element, isVerified) }
          </>
        )))
    );
  }

  renderAnswer(element, isVerified) {
    const { answer, timer } = this.state;
    const disabled = timer <= 0 || answer !== '';
    const answers = [element.correct_answer, ...element.incorrect_answers];
    const randomAnswers = answers.sort();
    const timeOut = timer === 0;
    return randomAnswers.map((quest, i) => {
      if (quest === element.correct_answer) {
        return (
          <button
            className={ isVerified || timeOut ? 'answered' : 'answers' }
            type="button"
            name="question"
            value="correct-answer"
            data-testid="correct-answer"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            { quest }
          </button>
        );
      }
      return (
        <button
          className={ isVerified || timeOut ? 'answered' : 'answers' }
          key={ quest }
          type="button"
          id={ quest }
          name="question"
          value="wrong-answer"
          disabled={ disabled }
          data-testid={ `wrong-answer-${i}` }
          style={ isVerified || timeOut ? {
            backgroundColor: '#2f3541' } : null }
          onClick={ this.handleClick }
        >
          { quest }
        </button>
      );
    });
  }

  render() {
    const { userName, userEmail, questions } = this.props;
    const { styleBtn, score, timer } = this.state;
    return (
      <div className="mainContainer">
        <img src={ logo } className="App-logo2" alt="logo2" />
        <div className="game">
          <header data-testid="header-profile-picture" className="header">
            <img
              src={ getGravatar(userEmail) }
              data-testid="header-profile-picture"
              alt="avatar"
            />
            <h3 data-testid="header-player-name" className="font-hd">{ userName }</h3>
            <h4 className="font-hd">{ `Timer: ${timer}` }</h4>
            <h4 data-testid="header-score" className="font-hd">{ `Score: ${score}` }</h4>
          </header>
          <div className="questions">
            {questions.length > 0 ? this.renderQuestions()
              : <h1 className="loading">Carregando...</h1>}
            <button
              className="button-next"
              type="button"
              data-testid="btn-next"
              style={ timer === 0 ? { display: 'block' } : styleBtn }
              onClick={ this.nextQuestion }
            >
              Próxima
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  dispatchCorrectAnswers: PropTypes.func.isRequired,
  dispatchGetQuestions: PropTypes.func.isRequired,
  dispatchScore: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  questions: PropTypes.shape({
    category: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answer: PropTypes.arrayOf(PropTypes.string),
    length: PropTypes.number,
    map: PropTypes.func,
    question: PropTypes.string,
  }).isRequired,
  token: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userName: state.loginReducer.playerName,
  userEmail: state.loginReducer.playerEmail,
  questions: state.questionsReducer.questions,
  token: state.loginReducer.token,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGetQuestions: (token) => dispatch(getQuestions(token)),
  dispatchScore: (state) => dispatch(setScore(state)),
  dispatchCorrectAnswers: (state) => dispatch(setAnswers(state)),
  dispatchSaveRank: (name, score, picture) => dispatch(savePlayers(name, score, picture)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
