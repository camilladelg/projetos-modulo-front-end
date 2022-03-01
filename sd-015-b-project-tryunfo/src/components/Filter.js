import React from 'react';
import PropTypes from 'prop-types';

class Filter extends React.Component {
  render() {
    const { filterName, onInputChange } = this.props;
    return (
      <>
        <h3>Todas as cartas</h3>
        <h5>Filtros de busca</h5>
        <input
          type="text"
          data-testid="name-filter"
          name="filterName"
          value={ filterName }
          onChange={ onInputChange }
        />
      </>
    );
  }
}

Filter.propTypes = PropTypes.shape({
  filterName: PropTypes.string,
  onInputChange: PropTypes.func,
}).isRequired;
export default Filter;
