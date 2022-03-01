import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa componete NotFound.js', () => {
  test(`Testa se página contém um heading h2 com o texto "Page,
    requested not found" 😭`, () => {
    const { history } = renderWithRouter(<NotFound />);
    history.push('/pag-nao-existe');
    const msnPagNaoExiste = screen.getByRole('heading', {
      name: /Page requested not found/i });
    expect(msnPagNaoExiste).toBeInTheDocument();
  });

  test(`Teste se página mostra a imagem,
    https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`, () => {
    const { history } = renderWithRouter(<NotFound />);
    history.push('/pag-nao-existe');
    const img = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = screen.getByAltText(/Pikachu crying because the page requested was/i);
    expect(image.src).toEqual(img);
  });
});
