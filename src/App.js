import React from 'react';
import SudokuBoard from './components/SudokuBoard';
import './styles/App.css';
import './styles/SudokuBoard.css';
import './styles/SudokuValueBox.css';

function App() {
  return (
    <div className="App">
      <SudokuBoard />
    </div>
  );
}

export default App;
