import './style.scss';
import React from 'react';
import { StoreMember, actionsMember } from '../../stores/member';
import { StoreMain } from '../../stores/main';
import ComponentUrlWatched from './../common/componentUrlWatched';
import CardMember from './cardMember';

class ViewMembers extends ComponentUrlWatched {

    constructor(props) {
        super(props);
        this.stores = [StoreMember, StoreMain];
    }

    urlUpdated() {
        actionsMember.get();
    }

    render() {
        const members = this.state.members;
        const session = this.state.session;

        const items = members.filter(member => member._id !== session._id)
            .map(member => <CardMember
                key={member._id}
                className='view-members__grid__item'
                member={member} key={member._id} />);

        for (let i = 0; i < 10; i++) {
            items.push(<div className='view-members__grid__item-empty' key={i} />)
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