import React, { useState, useEffect } from 'react';
import SudokuValueBox from './SudokuValueBox';

const SudokuBoard = () => {
    const [cells, setCells] = useState(new Array(81).fill(0));
    const [originalBoard, setOriginalBoard] = useState([]);

    useEffect(() => {
        GetBoard();
    }, []);

    const GetBoard = () => {
        fetch('https://sugoku.herokuapp.com/board?difficulty=easy', {
            method: 'get'
        })
            .then(response => response.json())
            .then(data => {
                setOriginalBoard(data.board);
                PopulateBoard(data.board);
            })
            .catch((err) => {
                // Error :(
            });
    }

    const GetSolution = () => {
        fetch('/api/sudoku/solution', {
            method: 'post',
            body: JSON.stringify(originalBoard)
        })
            .then(response => response.json())
            .then(data => {
                if (data.isSuccessful) {
                    PopulateBoard(data.solution);
                } else {

                }
            })
            .catch((err) => {
                // Error :(
            });
    }

    const PopulateBoard = (board) => {
        var tempValuesHolder = [];

        for (let i = 0; i < board.length; i++) {
            for (let y = 0; y < board.length; y++) {
                tempValuesHolder.push(board[i][y]);
            }
        }
        setCells(tempValuesHolder);
    }

    return (
        <div className="sudoku_board">
            {cells.map((element, index) => {
                return <SudokuValueBox key={index} value={element} />
            })}
            <button className="new_btn board_btn" onClick={GetBoard}>NEW</button>
            <button className="solution_btn board_btn" onClick={GetSolution}>SOLUTION</button>
        </div>
    )
}

export default SudokuBoard;