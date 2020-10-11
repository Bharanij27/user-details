import React from 'react';

const Select = (props) => {
    return(
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">
                    <i className={props.iconClass}></i>
                </div>
            </div>                
            <select required className="form-control" value={props.value} name = {props.name} onChange={props.handleSelect}>
                <option value="" disabled>{props.placeholder}</option>
                {props.options.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
        </div>
    )
}

export default Select;