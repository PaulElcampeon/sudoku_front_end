import React from 'react';

const SudokuValueBox = (props) => {
    const styleName = props.wasGiven ? "sudoku_value_box" : "sudoku_value_box unsolved";

    const UpdateValue = (e) => {
        if (!props.wasGiven) {
            if (e.target.value === "") {
            } else {
                const tempValue = e.target.value;
                const tempArray = tempValue.split("");
                const newValue = tempArray.pop();
                props.onChange({ index: props.index, value: newValue })
            }
        }
    }

    return (
        <div className={styleName}>
            <input className="value_box_input" type="text" value={props.value} onChange={UpdateValue} />
        </div>
    )
}

export default SudokuValueBox;