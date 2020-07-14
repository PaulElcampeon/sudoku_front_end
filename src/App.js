import React from 'react';
import SudokuBoard from './components/SudokuBoard';
import './styles/App.css';
import './styles/SudokuBoard.css';
import './styles/SudokuValueBox.css';

function App() {
  return (
    <div className="App">
      <h1 className="title">SUDOKU SOLVER <span>ALPHA</span></h1>
      <SudokuBoard />
    </div>
  );
}

export default App;
