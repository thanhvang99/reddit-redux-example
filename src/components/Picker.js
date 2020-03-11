import React from 'react';

const Picker = (props) => {
    const {value,onChange,options} = props;
    return (
        <select value={value} onChange={ (e) => onChange(e.target.value) } >
            {
                options.map(option => (
                    <option value={option} key={option}>
                        {option}
                    </option>
                ))
            }
        </select>
    )
}

export default Picker;
