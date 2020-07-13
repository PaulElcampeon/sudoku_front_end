import React from 'react';

const SudokuValueBox = (props) => {

    const styleName = props.value === 0? "sudoku_value_box unsolved" : "sudoku_value_box";
    return (
        <div className={styleName}>
            {props.value}
        </div>
    )
}

export default SudokuValueBox;