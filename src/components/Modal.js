import React, { Fragment } from 'react';
import '../Modal.css';
import Form from './Form'

const Modal = (props) => {
    let {isVisible, editUser, data,fetchData} = props;

    return (
        <Fragment>
                <div className="model-container">
                    <div className={isVisible ? " model show-model" : "model"}>
                        <div className="model-content">
                            <div className="close-btn bg-red" onClick={editUser}>X</div>
                            <Form data = {data} fetchData={fetchData}/>
                        </div>
                    </div>
                </div>
        </Fragment>
    )
}

export default Modal;