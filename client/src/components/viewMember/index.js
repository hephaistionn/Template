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

        const editButton = <Link to={'/members/' + member._id + '/edit'}>{tr('edit')}</Link>;

        return (
            <div className='view-profile'>
                <div>ViewMember</div>
                <div>{member.username}</div>
                <div>{member.email}</div>
                {member.avatar &&
                    <div className='view-profile__picture' style={{ backgroundImage: 'url(' + (member.avatar) + ')' }}></div>
                }
                {session._id === member._id && editButton}
            </div>
        );
    }
}

export default ViewMember;  