import { render } from 'react-dom';
import './app.scss';
import Reflux from 'reflux';
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom'
import Header from './components/header';
import Menu from './components/menu';
import ViewArticle from './components/viewArticle';
import ViewArticles from './components/viewArticles';
import ViewHome from './components/viewHome';
import ViewMessages from './components/viewMessages';
import ViewMember from './components/viewMember';
import ViewMembers from './components/viewMembers';
import ViewMemberEdit from './components/viewMemberEdit';
import ViewSignin from './components/viewSignin';
import ViewSignup from './components/viewSignup';
import ViewVerify from './components/viewVerify';
import ViewVerifyRequest from './components/viewVerifyRequest';
import ViewReset from './components/viewReset';
import ViewResetRequest from './components/viewResetRequest';
import ViewArticleEdit from './components/viewArticleEdit';

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

        const session = this.state.session;

        return (
            <Router history={history}>
                <div>
                    <Header />
                    <Route exact path='/' component={ViewHome} />
                    <Route exact path='/signin' component={ViewSignin} />
                    <Route exact path='/signup' component={ViewSignup} />
                    <Route exact path='/verify' component={ViewVerify} />
                    <Route exact path='/verify/request' component={ViewVerifyRequest} />
                    <Route exact path='/reset' component={ViewReset} />
                    <Route exact path='/reset/request' component={ViewResetRequest} />
                    <Route strict  path='/messages' component={Menu} />
                    <Route strict  path='/articles' component={Menu} />
                    <Route strict  path='/members' component={Menu} />
                    <Route exact path='/messages' component={ViewMessages} />
                    <Route exact path='/messages/:memberId' component={ViewMessages} />
                    <Switch>
                        <Route exact path='/articles/create' component={ViewArticleEdit} />
                        <Route exact path='/articles/:articleId' component={ViewArticle} />
                    </Switch>
                    <Route exact path='/articles/:articleId/edit' component={ViewArticleEdit} />
                    <Route exact path='/members/:memberId/edit' component={ViewMemberEdit} />
                    <Route exact path='/members/:memberId' component={ViewMember} />
                    <Route exact path='/members' component={ViewMembers} />
                    <Route exact path='/articles' component={ViewArticles} />
                </div>
            </Router>
        );
    }
}

render(<App />, document.getElementById('app')); 
