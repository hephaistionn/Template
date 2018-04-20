import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import { Route } from 'react-router-dom'
import { StoreMessage, actionsMessage } from '../../stores/message';
import ComponentUrlWatched from './../common/componentUrlWatched';
import Discussion from './discussion';
import Discussions from './discussions';

class ViewDiscussion extends ComponentUrlWatched {

    constructor(props) {
        super(props);
        this.stores = [StoreMessage];
    }

    onUrlChange(params) {
        actionsMessage.get();
    }

    render() {
        const messages = this.state.messages;
        const conversations = this.state.conversations;
        const state = this.getParam() ? 'optional' : '';
        return (
            <div className='view-discussion'>
                <Discussions conversations={conversations} className={state}/>
                <Route exact path='/messages/:memberId' component={Discussion} />
            </div>
        );
    }
}

export default ViewDiscussion;  