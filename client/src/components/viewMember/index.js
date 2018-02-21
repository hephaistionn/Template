import './style.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { StoreMember, actionsMember } from '../../stores/member';
import { StoreMain } from '../../stores/main';
import ComponentUrlWatched from './../common/componentUrlWatched';

class ViewMember extends ComponentUrlWatched {

    constructor(props) {
        super(props);
        this.stores = [StoreMember, StoreMain];
    }

    urlUpdated() {
        const memberId = this.props.match.params.memberId;
        actionsMember.get(memberId);
    }

    render() {
        const member = this.state.member;
        const session = this.state.session;
        
        return (
            <div className='view-member'>
                <div className='view-member__avatar'
                    style={member.avatar && { backgroundImage: `url(${member.avatar})` }} />
                <div className='view-member__username' >{member.username}</div>
                <div className='view-member__description' >{member.description}</div>
                <Link
                    className={`view-member__edit fas fa-edit ${session._id !== member._id ? ' hide' : ''}`}
                    aria-hidden='true'
                    to={'/members/' + member._id + '/edit'}>
                </Link>
                <Link
                    className={`view-member__message fas fa-comment-alt ${session._id === member._id ? ' hide' : ''}`}
                    aria-hidden='true'
                    to={`/messages/${member._id}`}>
                </Link>;
            </div>
        );
    }
}

export default ViewMember;  