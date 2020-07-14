import React, { useState, useEffect } from 'react';
import SudokuValueBox from './SudokuValueBox';

const SudokuBoard = () => {
    const [cells, setCells] = useState(new Array(81).fill(0));
    const [originalBoard, setOriginalBoard] = useState([]);
    const [updatingBoard, setUpdatingBoard] = useState([]);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        GetBoard();
    }, []);

    const GetBoard = () => {
        fetch('https://sugoku.herokuapp.com/board?difficulty=easy', {
            method: 'get'
        })
            .then(response => response.json())
            .then(data => {
                const formattedBoard = FormatBoard(data.board)
                setOriginalBoard(formattedBoard);
                setUpdatingBoard(formattedBoard);
                PopulateBoard(formattedBoard);
            })
            .catch((err) => {
                setMessage("Error");
            });
    }

    const GetSolution = () => {
        fetch('/api/sudoku/get-solution', {
            method: 'post',
            body: JSON.stringify({ currentBoard: originalBoard }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.isSuccessful) {
                    PopulateBoard(data.solution);
                    setUpdatingBoard(data.solution);
                } else {
                    setMessage("No Solution");
                }
            })
            .catch((err) => {
                setMessage("Error");
            });
    }

    const SubmitAnswer = () => {
        fetch('/api/sudoku/check-answer', {
            method: 'post',
            body: JSON.stringify({ originalBoard: originalBoard, edittedBoard: updatingBoard }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.isSuccessful) {
                    setMessage("Correct");
                } else {
                    setMessage("Incorrect");
                }
            })
            .catch((err) => {
                setMessage("Error");
            });
    }

    const CloseMessage = () => {
        setMessage(null)
    }

    const FormatBoard = (board) => {
        for (let i = 0; i < board.length; i++) {
            for (let y = 0; y < board.length; y++) {
                const wasGiven = board[i][y] !== 0;
                board[i][y] = { value: board[i][y], wasGiven: wasGiven }
            }
        }
        return board;
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

    const UpdateOriginalBoard = ({ index, value }) => {
        const x = Math.floor(index / 9)
        const y = index > 8 ? index % 9 : index
        updatingBoard[x][y].value = Number(value);
        setUpdatingBoard(updatingBoard);
    }

    return (
        <div className="sudoku_board">
            {cells.map((element, index) => {
                return <SudokuValueBox key={index} index={index} {...element} onChange={UpdateOriginalBoard} />
            })}
            <button className="new_btn board_btn" onClick={GetBoard}>GENERATE</button>
            <button className="solution_btn board_btn" onClick={GetSolution}>SOLUTION</button>
            <button className="submit_btn board_btn" onClick={SubmitAnswer}>SUBMIT</button>
            {message && <div className="message_display">
                <h1 className="message">{message}</h1>
                <button className="close_btn" onClick={CloseMessage}>CLOSE</button>
            </div>
            }
        </div>
    )
}

export default SudokuBoard;