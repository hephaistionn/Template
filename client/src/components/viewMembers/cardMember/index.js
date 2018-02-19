import './style.scss';
import React from 'react';
import { actionsMain } from '../../../stores/main';
import { Link, NavLink } from 'react-router-dom';

class CardMember extends React.Component {

    render() {
        const member = this.props.member;

        return (
            <Link className={`card-member ${this.props.className || ''}`}
                style={member.avatar && { backgroundImage: `url(${member.avatar})` }}
                draggable={this.props.draggable}
                to={`/members/${member._id}`}>
                <span className="card-member__username">{member.username}</span>
            </Link>
        )
    }
}

export default CardMember;