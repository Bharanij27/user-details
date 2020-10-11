import React from 'react';

const Input = (props) => {
    return(
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">
                    <i className={props.iconClass}></i>
                </div>
            </div>                
            <input type={props.type} name= {props.name} value={props.value} className="form-control" required placeholder={props.placeholder} onChange={props.onInputChange.bind(this)}/>
        </div>
    )
}

export default Input