import { render } from 'react-dom';
import './app.scss';
import Reflux from 'reflux';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ViewHeader from './components/viewHeader';
import ViewArticle from './components/viewArticle';
import ViewArticles from './components/viewArticles';
import ViewHome from './components/viewHome';
import ViewMessages from './components/viewMessages';
import ViewMember from './components/viewMember';
import ViewMembers from './components/viewMembers';
import ViewMemberEdit from './components/viewMemberEdit';
import ViewSignin from './components/viewSignin';
import ViewSignup from './components/viewSignup';
import ViewArticleEdit from './components/viewArticleEdit';
import { actionsMember, StoreMember } from './stores/member';


class App extends Reflux.Component {

    constructor(props) {
        super(props);
        this.store = StoreMember;
    }

    componentDidMount() {
        actionsMember.getCurrentMember();
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <ViewHeader />
                    <Route exact path='/' component={ViewHome} />
                    <Route exact path='/signin' component={ViewSignin} />
                    <Route exact path='/signup' component={ViewSignup} />
                    <Route exact path='/messages/' component={ViewMessages} />
                    <Route exact path='/messages/:memberId1/:memberId2' component={ViewMessages} />
                    <Switch>
                        <Route exact path='/articles/create' component={ViewArticleEdit} />
                        <Route exact path='/articles/:articleId' component={ViewArticle} />
                    </Switch>
                    <Route exact path='/articles/:articleId/edit' component={ViewArticleEdit} />
                    <Route exact path='/members/:memberId/edit' component={ViewMemberEdit} />
                    <Route exact path='/members/:memberId' component={ViewMember} />
                    <Route exact path='/members/' component={ViewMembers} />
                    <Route exact path='/articles/' component={ViewArticles} />
                </div>
            </BrowserRouter>
        );
    }
}

render(<App />, document.getElementById('app')); 
