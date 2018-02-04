import './style.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { StoreMember, actionsMember } from '../../stores/member';
import ComponentUrlWatched from './../common/componentUrlWatched';

class ViewMember extends ComponentUrlWatched {

    constructor(props) {
        super(props);
        this.store = StoreMember;
    }

    urlUpdated() {
        const memberId = this.props.match.params.memberId;
        actionsMember.get(memberId);
    }

    render() {
        const member = this.state.member;
        const currentMember = this.state.currentMember;

        const editButton = <Link to={'/members/' + member._id + '/edit'}>{tr("edit")}</Link>;

        return (
            <div className='view-profile'>
                <div>ViewMember</div>
                <div>{member.username}</div>
                <div>{member.email}</div>
                {currentMember._id === member._id && editButton}
            </div>
        );
    }
}

export default ViewMember;  