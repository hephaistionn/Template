import {render} from 'react-dom';
import Reflux from 'reflux';
import React from 'react';
import {BrowserRouter, Route, Link, Redirect} from 'react-router-dom'
 
import Home from './components/home';
import Header from './components/header';
import Login from './components/login';
import Signup from './components/signup';

class App extends Reflux.Component {

    constructor(props) { 
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <div className={'container'}>
                    <Header />
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/login' component={Login}/>
                    <Route path='/signup' component={Signup}/>
                </div>
            </BrowserRouter>
        );
    }
}

render(<App />, document.getElementById('app')); 