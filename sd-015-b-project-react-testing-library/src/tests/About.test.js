import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testa componente About', () => {
  test('A página deve conter um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const h2 = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(h2).toBeInTheDocument();
  });

  test('A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragrafos = screen.getAllByText(/pokémons/i);
    expect(paragrafos.length).toBe(2);
  });

  test('a página deve conter a imagem definida de uma Pokédex', () => {
    renderWithRouter(<About />);
    const img = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByAltText(/Pokédex/i);
    expect(image.src).toEqual(img);
  });
});
