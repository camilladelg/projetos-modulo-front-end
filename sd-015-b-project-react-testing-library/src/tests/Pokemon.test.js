import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe(' Testa o componente Pokemon.js', () => {
  test('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe('Pikachu');

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toBe('Electric');

    const weight = '6.0 kg';
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight.innerHTML).toBe(`Average weight: ${weight}`);

    const img = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const pokemonImg = screen.getByAltText('Pikachu sprite');
    expect(pokemonImg.src).toBe(img);
  });

  test(`Testa se o card do Pokémon contém um link de
  navegação para exibir detalhes deste Pokémon`, () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: 'More details' });
    const link = 'http://localhost/pokemons/25';
    expect(linkDetails).toBeInTheDocument();
    expect(linkDetails.href).toBe(link);
  });

  test(`Testa se ao clicar no link de navegação do Pokémon, é feito o
  redirecionamento da aplicação para a página de detalhes de Pokémon.
  Testa se existe um ícone de estrela nos Pokémons favoritados`, () => {
    const { history } = renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: 'More details' });

    userEvent.click(linkDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    const inputFavorite = screen.getByRole('checkbox');
    expect(inputFavorite).toBeInTheDocument();
    userEvent.click(inputFavorite);

    const pokemonAlt = 'Pikachu is marked as favorite';
    const pokemonSrc = 'http://localhost/star-icon.svg';
    const pokemonImg = screen.getByAltText(pokemonAlt);
    expect(pokemonImg.src).toBe(pokemonSrc);
  });
});
