import React, { useContext } from 'react';
import SPSContext from '../context/SPSContext';

function FilterByName() {
  const { onChangeName } = useContext(SPSContext);
  return (
    <input
      type="text"
      data-testid="name-filter"
      onChange={ (e) => onChangeName(e.target.value) }
    />
  );
}

export default FilterByName;
