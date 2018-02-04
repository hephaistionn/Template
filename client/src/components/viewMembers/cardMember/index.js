import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import Moment from 'moment';
import { Link } from 'react-router-dom';

class CardMember extends Reflux.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const member = this.props.member;
        return (
            <Link className='card-member' to={'/members/' + member._id}>
                <div>{member.username}</div>
            </Link>
        );
    }
}

export default CardMember;  