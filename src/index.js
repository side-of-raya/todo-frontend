import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login'
import App from './App'
import * as serviceWorker from './serviceWorker';
import Registration from './Registration';
import EmailConfirmation from './EmailConfirmation';
import {
    Route,
    Switch,
    BrowserRouter,
  } from 'react-router-dom';

ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <Route exact path='/'><App /></Route>
            <Route path='/Login'> <Login /> </Route>
            <Route path='/Registration' ><Registration /></Route>
            <Route path='/Confirm'><EmailConfirmation/></Route>
        </Switch>
    </BrowserRouter>
), document.getElementById('root'));
serviceWorker.unregister();
