import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const pokemonDetails = '/pokemons/25';

describe('Teste o componente PokemonDetails.js', () => {
  test(`Teste se as informações detalhadas do Pokémon
  selecionado são mostradas na tela.`, () => {
    const { history } = renderWithRouter(<App />);

    history.push(pokemonDetails);
    const h2Details = screen.getByRole('heading', { name: 'Pikachu Details' });
    expect(h2Details).toBeInTheDocument();

    const h2Sumary = screen.getByRole('heading', { name: 'Summary' });
    expect(h2Sumary).toBeInTheDocument();

    const resume = screen.getByText(/This intelligent Pokémon roasts/i);
    expect(resume).toBeInTheDocument();
  });

  test(`Teste se existe na página uma seção com os mapas
  contendo as localizações do pokémon`, () => {
    const { history } = renderWithRouter(<App />);
    history.push(pokemonDetails);

    const h2Location = screen.getByRole('heading', { name: 'Game Locations of Pikachu' });
    expect(h2Location).toBeInTheDocument();

    const imgsLocation = screen.getAllByRole('img', { name: 'Pikachu location' });
    console.log(imgsLocation);
    const locations = [
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    ];

    for (let i = 0; i < locations.length; i += 1) {
      expect(imgsLocation[i]).toBeInTheDocument();
      expect(imgsLocation[i].src).toEqual(locations[i]);
    }
  });

  test(`Teste se o usuário pode favoritar um pokémon
  através da página de detalhes`, () => {
    const { history } = renderWithRouter(<App />);
    history.push(pokemonDetails);

    const inputFavorite = screen.getByLabelText('Pokémon favoritado?');
    expect(inputFavorite).toBeInTheDocument();
    expect(inputFavorite).toHaveProperty('checked', false);
    userEvent.click(inputFavorite);
    expect(inputFavorite).toHaveProperty('checked');
  });
});
