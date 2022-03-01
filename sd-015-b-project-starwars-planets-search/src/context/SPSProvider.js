import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SPSContext from './SPSContext';

function SPSProvider({ children }) {
  const [data, setData] = useState([]);
  const [arrFiltered, setArrFiltered] = useState([]);
  const [filter, setFilter] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: {
      column: 'population',
      comparison: 'maior que',
      value: 0,
    },
  });
  const [columnsFilters, setColumnsFilters] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const { column, comparison, value: number } = filter.filterByNumericValues;

  async function fetchApi() {
    const resolve = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const { results } = await resolve.json();
    // results.map((result) => delete result.residents);
    setData(results);
  }

  useEffect(() => {
    fetchApi();
  }, []);

  function onChangeName(value) {
    setFilter({ ...filter, filterByName: { name: value } });
  }

  function onChangeColumn(value) {
    setFilter({
      ...filter,
      filterByNumericValues: { column: value, comparison, value: number } });
  }

  function onChangeComparison(value) {
    setFilter({
      ...filter,
      filterByNumericValues: { column, comparison: value, value: number } });
  }

  function onChangeValue(value) {
    setFilter({
      ...filter,
      filterByNumericValues: { column, comparison, value } });
  }

  function filterOnClick() {
    const filterByValues = data.filter((planet) => {
      if (comparison === 'maior que') {
        return Number(planet[column]) > Number(number);
      }
      if (comparison === 'menor que') {
        return Number(planet[column]) < Number(number);
      }
      if (comparison === 'igual a') {
        return Number(planet[column]) === Number(number);
      }
      return data;
    });
    setArrFiltered([...arrFiltered, filter.filterByNumericValues]);
    setData(filterByValues);
    setColumnsFilters(columnsFilters.filter((columns) => columns !== column));
    setFilter({
      ...filter,
      filterByNumericValues: {
        column:
          columnsFilters.filter((columns) => columns !== column)[0],
        comparison,
        value: number,
      } });
  }

  const values = {
    data,
    filter,
    onChangeName,
    onChangeColumn,
    onChangeComparison,
    onChangeValue,
    filterOnClick,
    columnsFilters,
    arrFiltered,
  };

  return (
    <SPSContext.Provider value={ values }>
      { children }
    </SPSContext.Provider>
  );
}

SPSProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SPSProvider;
