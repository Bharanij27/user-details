import React, { useEffect, useState } from 'react';
import Users  from './Users';
import Modal from './Modal';

const Details = () => {
    let [userDetails, setUserDetails] = useState([]);

    useEffect(() =>{
        fetchData();
    }, []);

    
    let [isVisible, setIsVisible] = useState(false);

    let [selectedData, setSelectedData] = useState();

    async function fetchData(){
        let data = await fetch('https://bhraranj27-server.herokuapp.com/');
        let details = await data.json();
        details = details.userList;
        setUserDetails(details)
    }

    const deleteUser = async (index) => {
        debugger
        let deleteData = await fetch('https://bhraranj27-server.herokuapp.com/deleteUser', {
            method : 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({_id : userDetails[index]._id}),
        })
        let result = await deleteData.json();
        if(result.status === 200){
            fetchData();
        }
        else alert(result.message);
    }

    const editUser = (index) => {
        setSelectedData(userDetails[index]);
        setIsVisible(!isVisible);
        fetchData();    
    }

    let headers = ['', 'Name', 'Email', 'Country', 'State', 'City', 'Address1','Address2', 'Gender', 'Marital Status', 'Favotite Food', 'Favotite Color']
    return(
        <div>
            <table className="table table-dark text-center">
                <thead>
                    <tr>
                        {headers.map(heading => <th key={heading} scope="col">{heading}</th>)}
                    </tr>
                </thead>
                <Users data={userDetails} deleteUser={deleteUser} editUser = {editUser} isVisible ={isVisible} setIsVisible={setIsVisible}/>
            </table>
                {isVisible && <Modal isVisible ={isVisible} fetchData={fetchData} data={selectedData} setIsVisible={setIsVisible} editUser={editUser}/>}
        </div>
    )
}

export default Details;