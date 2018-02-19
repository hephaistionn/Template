import './style.scss';
import React from 'react';
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

        const items = members.map(member => <CardMember
            className='view-members__grid__item'
            member={member} key={member._id} />);

        for (let i = 0; i < 10; i++) {
            items.push(<div className='view-members__grid__item-empty' />)
        }

        return (
            <div className='view-members'>
                <div className='view-members__grid'>
                    {items}
                </div>
            </div>
        );
    }
}

export default ViewMembers;  