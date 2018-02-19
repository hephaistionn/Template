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

        const editButton = <Link 
            className='view-member__edit far fa-edit'
            aria-hidden='true'
            to={'/members/' + member._id + '/edit'}>
        </Link>;

        return (
            <div className='view-member'>
                <div className='view-member__avatar'
                    style={member.avatar && { backgroundImage: `url(${member.avatar})` }} />
                <div className='view-member__username' >{member.username}</div>
                <div className='view-member__description' >{member.description}</div>
                {session._id === member._id && editButton}
            </div>
        );
    }
}

export default ViewMember;  