import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const pokemonName = 'pokemon-name';

describe('Testa o componente Pokedex.js', () => {
  test('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const titulo = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(titulo).toBeInTheDocument();
  });

  test(`Teste se é exibido o próximo Pokémon da lista quando
  o botão Próximo pokémon é clicado`, () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeInTheDocument();

    const pokemon = screen.getByTestId(pokemonName, { name: /charmander/i });
    userEvent.click(button);
    expect(pokemon).toBeInTheDocument();
  });

  test('Testa se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pokemons = screen.getAllByTestId(pokemonName);
    expect(pokemons.length).toBe(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const buttonAll = screen.getAllByRole('button', { name: /all/i });
    const allButtons = [...filterButtons, ...buttonAll];

    allButtons.forEach((button) => expect(button).toBeInTheDocument());

    const pokemons = ['Electric', 'Fire', 'Bug', 'Poison',
      'Psychic', 'Normal', 'Dragon', 'All'];

    for (let i = 0; i < pokemons.length; i += 1) {
      expect(allButtons[i].innerHTML).toEqual(pokemons[i]);
    }
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();

    userEvent.click(allButton);
    const pikachu = screen.getByTestId(pokemonName);
    expect(pikachu.innerHTML).toBe('Pikachu');
  });
});
