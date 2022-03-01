import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('', () => {
  test(`Se não tiver pokémons favoritos deverá aparecer,
    a mensagem "No favorite pokemon found"`, () => {
    renderWithRouter(<FavoritePokemons />);
    const paragrafo = screen.getByText('No favorite pokemon found');
    expect(paragrafo).toBeInTheDocument();
  });
});
