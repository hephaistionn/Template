import { render } from 'react-dom';
import './app.scss';
import Reflux from 'reflux';
import React from 'react';
import { Router, Route } from 'react-router-dom'
import Header from './components/header';
import Menu from './components/menu';
import ViewArticle from './components/viewArticle';
import ViewHome from './components/viewHome';
import ViewDiscussion from './components/ViewDiscussion';
import ViewMember from './components/viewMember';
import ViewSignin from './components/viewSignin';
import ViewSignup from './components/viewSignup';
import ViewVerify from './components/viewVerify';
import ViewReset from './components/viewReset';

import { actionsMain, history, StoreMain } from './stores/main';

class App extends Reflux.Component {

    constructor(props) {
        super(props);
        this.store = StoreMain;
    }

    componentDidMount() {
        actionsMain.getSession();
    }

    render() {
        return (
            <Router history={history}>
                <div className='app-container'>
                    <Header />
                    <Route strict path='/messages' component={Menu} />
                    <Route strict path='/members' component={Menu} />
                    <Route strict path='/articles' component={Menu} />
                    <div className='app-container__views'>
                        <Route exact path='/' component={ViewHome} />
                        <Route exact path='/signin' component={ViewSignin} />
                        <Route exact path='/signup' component={ViewSignup} />
                        <Route strict path='/verify' component={ViewVerify} />
                        <Route strict path='/reset' component={ViewReset} />
                        <Route strict path='/messages' component={ViewDiscussion} />
                        <Route strict path='/members' component={ViewMember} />
                        <Route strict path='/articles' component={ViewArticle} />
                    </div>
                </div>
            </Router>
        );
    }
}

render(<App />, document.getElementById('app')); 
