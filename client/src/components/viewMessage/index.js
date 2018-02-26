import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import Moment from 'moment';
import { StoreMain } from '../../stores/main';
import { StoreMessage, actionsMessage } from '../../stores/message';
import ComponentUrlWatched from './../common/componentUrlWatched';
import Textarea from '../common/textarea';

class ViewMessage extends ComponentUrlWatched {

    constructor(props) {
        super(props);
        this.stores = [StoreMain, StoreMessage];
        this.state = { message: '' };
    }

    urlUpdated(params) {
        const memberId = params.memberId;
        actionsMessage.get(memberId);
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

        if (!messages.length) {
            return <div />
        }

        const member = messages[0].team[0];
        const style = {
            backgroundColor: this.color,
            backgroundImage: member.avatar ? `url(${member.avatar})` : null
        };

        return (
            <div className='view-conversation'>
                <div className='view-conversation__previous fas fa-arrow-left'
                    aria-hidden='true'
                    onClick={this.props.history.goBack} />
                <div className={`view-conversation__member`}
                    style={style}>
                </div>
                <div className='view-conversation__list-messages'>
                    {messages.map((message, index) => <div
                        key={index}
                        className={`view-conversation__list-messages__item ${
                            message.owner === session._id ? 'your' : ''}`} >
                        <div className='view-conversation__list-messages__item__date'>
                            {Moment(message.date).format('MMM/DD HH:mm')}
                        </div>
                        <div className='view-conversation__list-messages__item__content'>
                            {message.content}
                        </div>
                    </div>)}
                </div>
                <div className='view-conversation__tools'>
                    <Textarea
                        className='view-conversation__tools__input'
                        type='text'
                        name='content'
                        value={message}
                        onChange={this.change.bind(this)} />
                    <div
                        className='view-conversation__tools__button'
                        onClick={this.send.bind(this)}>
                        {tr('send')}
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewMessage;  