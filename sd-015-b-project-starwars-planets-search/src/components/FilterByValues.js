import React, { useContext } from 'react';
import SPSContext from '../context/SPSContext';

function FilterByValues() {
  const { onChangeColumn, onChangeComparison,
    onChangeValue, filterOnClick, filter,
    columnsFilters, arrFiltered } = useContext(SPSContext);
  const { column: columns, comparison, value } = filter.filterByNumericValues;

  const comparisonFilter = [
    'maior que',
    'menor que',
    'igual a',
  ];

  return (
    <>
      <select
        data-testid="column-filter"
        value={ columns }
        onChange={ (e) => onChangeColumn(e.target.value) }
      >
        {columnsFilters.map((column) => <option key={ column }>{ column }</option>)}
      </select>
      <select
        data-testid="comparison-filter"
        value={ comparison }
        onChange={ (e) => onChangeComparison(e.target.value) }
      >
        {comparisonFilter.map((item) => <option key={ item }>{ item }</option>)}
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ value }
        onChange={ (e) => onChangeValue(e.target.value) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ filterOnClick }
      >
        Filtrar
      </button>
      {arrFiltered.length > 0 && arrFiltered.map((item, index) => (
        <div key={ index }>
          <span>{`${item.column} ${item.comparison} ${item.value}`}</span>
          <button type="button">X</button>
        </div>
      ))}
    </>
  );
}

export default FilterByValues;
