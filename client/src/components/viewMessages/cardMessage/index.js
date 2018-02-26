import './style.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';

class CardMessage extends React.Component {

    constructor(props) {
        super(props);
        const colors = ['#ff7606', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF', '#94ff6f'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    render() {
        const conversation = this.props.conversation;
        const member = conversation.member;
        const lastMessage = conversation.lastMessage;
        const date = Moment(conversation.date).format('MMM/DD HH:mm');

        const style = {
            backgroundColor: this.color,
            backgroundImage: member.avatar ? `url(${member.avatar})` : null
        };


        return (
            <div className={`card-message ${this.props.className || ''}`} >
                <Link className='card-message__member'
                    style={style}
                    to={`/members/${member._id}`}>
                </Link>
                <Link className='card-message__last'
                    to={`/messages/${member._id}`}>
                    <div className='card-message__last__date'>{date}</div>
                    <div className='card-message__last__content'>{lastMessage}</div>
                </Link>
            </div>
        )
    }
}

export default CardMessage;