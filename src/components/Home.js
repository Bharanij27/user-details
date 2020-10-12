import React from 'react';
import {Route, Switch, Link } from 'react-router-dom';
import routes from '../routes'
import Form from './Form';
import Details from './Details';

const Home = () => {
    return(
        <div>
            <header className="m-5">
                <Link to={routes.home}>
                    <button className="btn btn-info">New Detail</button>
                </Link>
                <Link className="ml-3" to={routes.users}>
                    <button className="btn btn-info">Users</button>
                </Link>
            </header>
            <Switch>
                <Route path = {routes.home}/>
                <Route path = {routes.users}/>
            </Switch>
            <Switch>
                <Route path="/" exact>
                    <Form/>
                </Route>
                <Route path="/users">
                    <Details/>
                </Route>
            </Switch>
        </div>
    )
} 

export default Home;