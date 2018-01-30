import {render} from 'react-dom';
import './app.scss';
import Reflux from 'reflux';
import React from 'react';
import 'whatwg-fetch';
import {BrowserRouter, Route, Link, Redirect} from 'react-router-dom'
import ViewHeader from './components/viewHeader';
import ViewArticle from './components/viewArticle';
import ViewArticles from './components/viewArticles';
import ViewHome from './components/viewHome';
import ViewMessages from './components/viewMessages';
import ViewProfile from './components/viewProfile';
import ViewSignin from './components/viewSignin';
import ViewSignup from './components/viewSignup';


class App extends Reflux.Component {

    constructor(props) { 
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <div className={'container'}>
                    <ViewHeader />
                    <Route exact path='/' component={ViewHome}/>
                    <Route exact path='/signin' component={ViewSignin}/>
                    <Route exact path='/signup' component={ViewSignup}/>
                    <Route exact path='/messages/:memberId1/:memberId2' component={ViewMessages}/>
                    <Route exact path='/articles/' component={ViewArticles}/>
                    <Route exact path='/articles/:articleId' component={ViewArticle}/>
                    <Route exact path='/profile/:memberId' component={ViewProfile}/>
                </div>
            </BrowserRouter>
        );
    }
}

render(<App />, document.getElementById('app')); 
