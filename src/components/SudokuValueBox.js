import React, { useState, useEffect } from 'react';

const SudokuValueBox = (props) => {
    const [value, setValue] = useState(0);
    
    useEffect(() => {
        setValue(props.value)
    });

    const styleName = props.wasGiven ? "sudoku_value_box" : "sudoku_value_box unsolved";

    const UpdateValue = (e) => {
        if (!props.wasGiven) {
            if (e.target.value === "") {
                setValue(0)
            } else {
                const tempValue = e.target.value;
                const tempArray = tempValue.split("");
                const newValue = tempArray.pop();
                setValue(newValue)
                props.onChange({ index: props.index, value: newValue })
            }
        }
    }

    return (
        <div className={styleName}>
            <input className="value_box_input" type="text" value={value} onChange={UpdateValue} />
        </div>
    )
}

export default SudokuValueBox;