import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import Moment from 'moment';
import { StoreMain } from '../../stores/main';
import { StoreMessage, actionsMessage } from '../../stores/message';
import CardMember from './cardMember';
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
        return (
            <div className='view-messages'>
                <div className='view-messages__list-members'>
                    {conversations.map(conversation => <CardMember
                        className='view-messages__list-members__item'
                        member={conversation.member} key={conversation.member._id} />)}
                </div>

                <div className='view-messages__conversation'>
                    <div className='view-messages__list-messages'>
                        {messages.map((message, index) => <div
                            key={index}
                            className={`view-messages__list-messages__item ${
                                message.owner === session._id ? 'your' : ''}`} >
                            <div className='view-messages__list-messages__item__date'>
                                {Moment(message.date).format('MMM/DD HH:mm')}
                            </div>
                            <div className='view-messages__list-messages__item__content'>
                                {message.content}
                            </div>
                        </div>)}
                    </div>
                    <div className='view-messages__tools'>
                        <Textarea
                            className='view-messages__tools__input'
                            type='text'
                            name='content'
                            value={message}
                            onChange={this.change.bind(this)} />
                        <div
                            className='view-messages__tools__button'
                            onClick={this.send.bind(this)}>
                            {tr('send')}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewMessages;  