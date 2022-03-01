import React, { useContext } from 'react';
import SPSContext from '../context/SPSContext';

function Table() {
  const { data, filter } = useContext(SPSContext);
  const { filterByName: { name } } = filter;

  const titles = ['Nome', 'Tempo de rotação', 'Periodo da órbita',
    'Diâmetro', 'Clima', 'Gravidade', 'Terreno', 'Água',
    'População', 'Filmes', 'Criado', 'Editado', 'URL'];

  return (
    <table>
      <thead>
        <tr>
          {titles.map((title) => <th key={ title }>{title}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.filter((planet) => planet.name.toLowerCase().includes(name.toLowerCase()))
          .map((planet) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default Table;
