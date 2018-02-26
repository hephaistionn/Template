import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import Moment from 'moment';
import { StoreMain } from '../../stores/main';
import { StoreMessage, actionsMessage } from '../../stores/message';
import CardMessage from './cardMessage';
import ComponentUrlWatched from './../common/componentUrlWatched';
import Textarea from '../common/textarea';

class ViewMessages extends ComponentUrlWatched {

    constructor(props) {
        super(props);
        this.stores = [StoreMain, StoreMessage];
        this.state = { message: '' };
    }

    urlUpdated(params) {
        const memberId = params.memberId;
        actionsMessage.get(memberId);
        actionsMessage.get();
    }

    change(event) {
        const value = event.target.value;
        this.setState({ message: value });
    }

    send() {
        const message = this.state.message;
        const memberId = this.props.match.params.memberId;
        actionsMessage.send(message, memberId);
        this.setState({ message: '' });
    }

    render() {
        const session = this.state.session;
        const message = this.state.message;
        const messages = this.state.messages;
        const conversations = this.state.conversations;
        console.log(conversations)
        return (
            <div className='view-messages'>
                <div className='view-messages__grid'>
                    {conversations.map((conversation, index) => <CardMessage
                        className='view-messages__grid__item'
                        conversation={conversation} key={index} />)}
                </div>
            </div>
        );
    }
}

export default ViewMessages;  