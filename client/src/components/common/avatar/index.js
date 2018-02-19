import './style.scss';
import React from 'react';
import { actionsMain } from '../../../stores/main';
import { Link, NavLink } from 'react-router-dom';

class Avatar extends React.Component {

    render() {
        const member = this.props.member;

        return (
            <Link className={`avatar ${this.props.className}`}
                style={member.avatar && { backgroundImage: `url(${member.avatar})` }}
                draggable={this.props.draggable}
                to={`/members/${member._id}`}>
            </Link> 
        )
    }
}

export default Avatar;