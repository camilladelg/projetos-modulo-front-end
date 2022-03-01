import React from 'react';
import './App.css';
import SPSProvider from './context/SPSProvider';
import Table from './components/Table';
import FilterByName from './components/FilterByName';
import FilterByValues from './components/FilterByValues';

function App() {
  return (
    <SPSProvider>
      <FilterByName />
      <FilterByValues />
      <Table />
    </SPSProvider>
  );
}

export default App;
