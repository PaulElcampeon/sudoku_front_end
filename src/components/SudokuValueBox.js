import React, { useState } from 'react';

const SudokuValueBox = (props) => {
    const [value, setValue] = useState(props.value);

    const styleName = props.value === 0 ? "sudoku_value_box unsolved" : "sudoku_value_box";

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
            {/* {props.value} */}
            <input className="value_box_input" type="text" value={props.value === 0 ? value : props.value} onChange={UpdateValue} />
        </div>
    )
}

export default SudokuValueBox;