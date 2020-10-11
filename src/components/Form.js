import React, { useEffect, useState } from 'react';
import Input from './Input';
import Select from './Select';

const Form = (props) => { 
    let details = {
        name : '', email : '', country : '', 
        state : '', city : '', address1 : '',
        address2 : '', gender: '', maritalStatus: '',
        favFood : '' , favColor: ''
    }

    let [userData, setUserData] = useState(props.data || details);

    let data = {'India' : {
            'Delhi' : ['Siri','Tughlqabad','Jahanpanah','Firozobad','The city around Purana Qila','Shahjahanabad','New Delhi'], 
            'Maharastra' : ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Solapur', 'Dhule'],
            'TamilNadu' : ['Chennai', 'Madurai', 'Vellore', 'Salem', 'Tirchy']
    }, 'USA' :{
            'NewYork' : ['Ithaca', 'Johnstown', 'Littleport', 'Mount Vernon'],
            'Washington' : ['grandView', 'Lakewood', 'Long Beach', 'Milton'],
            'Texas' : ['Houston', 'Dallas', 'Fort Worth', 'Austin']
    }}
    
    let genders = ['Male', 'Female', 'Cannot Mention']
    let maritalStatus = ['Single', 'Married'];

    let [country, setCountry] = useState(Object.keys(data));
    let [states, setState] = useState([]);
    let [city, setCity] = useState([]);

    useEffect(()=>{
        if(props.data) {
            // setCountry(userData.country)
            handleSelect({target :{
                name : "country",
                value : userData.country
            }})
            handleSelect({target :{
                name : "state",
                value : userData.state
            }})
            handleSelect({target :{
                name : "city",
                value : userData.city
            }})
        }
    }, [])

    const onInputChange = (event) => {
        setUserData({...userData, [event.target.name] : event.target.value})
    }

    const submitData = async (e) => {
        e.preventDefault();
        let pushData = await fetch('https://bhraranj27-server.herokuapp.com/addUser', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
        })
        let result = await pushData.json();
        if(result.status === 200){
            setUserData(details);
            alert('Data Updated Successfully');
        }
        else alert('Data can\'t be updated');
        console.log(result, details)
    }

    const update = async (event) => {
        event.preventDefault();
        let pushData = await fetch('https://bhraranj27-server.herokuapp.com/updateUser', {
            method : 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
        })
        let result = await pushData.json();
        if(result.status === 200){
            props.fetchData();
            alert('Data Updated Successfully');
        }
        else alert('Data can\'t be updated');
    }

    const handleSelect = (event) => {
        debugger
        let value =  event.target.value;
        let name = event.target.name;

        if(name === 'country'){
            setState(Object.keys(data[value]));
            setCity([]);
            setUserData({...userData, city : ''})
        }
        if(name === 'state'){
            setCity(data[userData.country][value]);
        }
        setUserData({...userData, [name] : value})
    }

    useEffect(()=>{
        return() => {
            setUserData(details)
        }
    }, [])

    return(
        <div className="main-content text-center">    
            <form onSubmit={props.data ? update : submitData}>
                <Input type = "text" iconClass="fa fa-user" name="name" placeholder = "Name" value = {userData.name} onInputChange ={onInputChange}/>
                <Input type = "email" iconClass="fa fa-at" name="email" placeholder = "E-mail Address " value = {userData.email} onInputChange ={onInputChange}/>
                <Input type = "text" iconClass="fa fa-address-book-o" name="address1" placeholder = "House No and Street Name " value = {userData.address1} onInputChange ={onInputChange}/>
                <Input type = "text" iconClass="fa fa-address-book" name="address2" placeholder = "Locality " value = {userData.address2} onInputChange ={onInputChange}/>
                <Select iconClass="fa fa-globe" value= {userData.country} name="country" options ={country} handleSelect = {handleSelect} placeholder = "Country"/>
                <Select iconClass="fa fa-map-marker" value= {userData.state} name="state" options ={states} handleSelect = {handleSelect} placeholder = "State"/>
                <Select iconClass="fa fa-location-arrow" value= {userData.city} name="city" options ={city} handleSelect = {handleSelect} placeholder = "City"/>
                <Select iconClass="fa fa-venus-mars" value= {userData.gender} name="gender" options = {genders} handleSelect = {handleSelect} placeholder = "Gender"/>
                <Select iconClass="fa fa-users" value= {userData.maritalStatus} name="maritalStatus" options = {maritalStatus} handleSelect = {handleSelect} placeholder = "Marital Status"/>
                <Input type = "text" iconClass="fa fa-cutlery" name="favFood" placeholder = "Favorite Food" value = {userData.favFood} onInputChange ={onInputChange}/>
                <Input type = "text" iconClass="fa fa-heart" name="favColor" placeholder = "Favorite Color" value = {userData.favColor} onInputChange ={onInputChange}/>
                <button type="submit" className= "btn btn-primary mt-3">Save</button>
            </form>
        </div>
    )
}

export default Form