import React from 'react';

const Value = (props) => {
    let details = props.details;
    details.shift();

    return(
        details.map((info, index) => <td key={index}>{info}</td>)
    )
}

export default Value;