import React, { useState } from 'react';

const SudokuValueBox = (props) => {
    const [value, setValue] = useState(0);

    const styleName = props.wasGiven? "sudoku_value_box" : "sudoku_value_box unsolved";

    const UpdateValue = (e) => {
        if (props.value === 0) {
            if (e.target.value === "") {
                setValue(0)
            } else {
                const tempValue = e.target.value;
                const tempArray = tempValue.split("");
                setValue(tempArray.pop())
            }
        }
    }

    return (
        <div className={styleName}>
            <input className="value_box_input" type="text" value={props.value === 0 ? value : props.value} onChange={UpdateValue} />
        </div>
    )
}

export default SudokuValueBox;