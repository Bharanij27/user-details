import React, { useState } from 'react';
import Value from './Value';

const Users = (props) => {
    let {data, deleteUser, editUser} = props;
    
    return(
        <tbody>
            {data.map((userData, index) => {
                return(
                    <tr key={index}>
                        <th scope="row">
                            {<i className="fa fa-trash-o mr-2 bg-red" onClick={() => deleteUser(index)}/>}
                            {<i className="fa fa-pencil bg-blue" onClick={() => editUser(index)}/>}
                        </th>
                        {
                            <Value details = {Object.values(userData)}/>
                        }
                    </tr>
                )
            })}
        </tbody>
    )
}

export default Users;