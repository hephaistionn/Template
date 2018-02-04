import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import { Link } from 'react-router-dom';
import { StoreMember, actionsMember } from '../../stores/member';
import ComponentUrlWatched from './../common/componentUrlWatched';
import CardMember from './cardMember';

class ViewMembers extends ComponentUrlWatched {

    constructor(props) {
        super(props);
        this.store = StoreMember;
    }

    urlUpdated() {
        actionsMember.get();
    }

    render() {
        const members = this.state.members;

        return (
            <div className='view-profiles'>
                <div>ViewProfiles</div>
                <div className='container-card'>
                    {members.map(member => <CardMember member={member} key={member._id} />)}
                </div>
            </div>
        );
    }
}

export default ViewMembers;  