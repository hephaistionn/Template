import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import { StoreMain } from './../../../stores/main';
import { StoreMessage, actionsMessage } from './../../../stores/message';
import ComponentUrlWatched from './../../common/componentUrlWatched';
import Textarea from './../../common/textarea';

class Discussion extends ComponentUrlWatched {

    constructor(props) {
        super(props);
        this.stores = [StoreMain, StoreMessage];
        this.state = { message: '' };
    }

    urlUpdated(params) {
        const memberId = params.memberId;
        actionsMessage.get(memberId);
        actionsMessage.updated = ()=>{
            this.autoview();
        }
    }

    change(value) {
        this.setState({ message: value });
    }

    send() {
        const message = this.state.message;
        const memberId = this.props.match.params.memberId;
        actionsMessage.send(message, memberId);
        this.setState({ message: '' });
    }

    autoview() {
        this.listview.scrollTop = this.listview.scrollHeight;
        this.listview.addEventListener("scroll",() => {            
            this.handleScroll();       
        });    
    }

    componentWillUnmount() {
        this.listview.removeEventListener("scroll",() => {            
            this.handleScroll();       
        });   
    }

    handleScroll(event) {      
        console.log('scrolled');
        // const memberId = this.props.match.params.memberId;
        // actionsMessage.getNextPage(memberId)
    }

    render() {
        const session = this.state.session;
        const message = this.state.message;
        const messages = this.state.messages;

        if (!messages) {
            return <div />
        }

        const member = messages.team[0];
        const style = {
            backgroundColor: this.color,
            backgroundImage: member.avatar ? `url(${member.avatar})` : null
        };

        return (
            <div className='discussion'>
                <div className='discussion__header'>
                    <div className='discussion__header__previous fas fa-arrow-left optional-full'
                        aria-hidden='true'
                        onClick={this.props.history.goBack} />
                    <Link className={`discussion__header__member`}
                        to={`/members/${member._id}`}
                        style={style}>
                    </Link>
                </div>
                <div className='discussion__list-messages'
                    ref={(c) => this.listview = c}>
                    {messages.list.map((message, index) => <div
                        key={index}
                        className={`discussion__list-messages__item ${
                            message.owner === session._id ? 'your' : ''}`} >
                        <div className='discussion__list-messages__item__date'>
                            {Moment(message.date).format('MMM/DD HH:mm')}
                        </div>
                        <div className='discussion__list-messages__item__content'>
                            {message.content}
                        </div>
                    </div>)}
                </div>
                <div className='discussion__tools'>
                    <Textarea
                        className='discussion__tools__input'
                        type='text'
                        name='content'
                        value={message}
                        onChange={this.change.bind(this)} />
                    <div
                        className='discussion__tools__button'
                        onClick={this.send.bind(this)}>
                        {tr('send')}
                    </div>
                </div>
            </div>
        );
    }
}

export default Discussion;  