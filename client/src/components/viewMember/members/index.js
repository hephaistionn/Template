import './style.scss';
import React from 'react';
import Reflux from 'reflux';
import { StoreMember, actionsMember } from '../../../stores/member';
import { StoreMain } from '../../../stores/main';
import CardMember from './cardMember';
import Filter from './../../filter'

class ViewMembers extends Reflux.Component {

    constructor(props) {
        super(props);
        this.stores = [StoreMember, StoreMain];
    }

    componentDidMount() {
        actionsMember.getList(null, 1);
    }

    render() {
        const members = this.state.members.docs;
        const session = this.state.session;

        if (!members) return <div />

        const items = members.filter(member => member._id !== session._id)
            .map((member, index) => <CardMember
                key={member._id}
                className='members__grid__item'
                member={member} key={member._id + index} />);

        for (let i = 0; i < 10; i++) {
            items.push(<div className='members__grid__item-empty' key={i} />)
        }

        const state = location.pathname.split('/')[2] ? 'optional' : '';

        return (
            <div className={`members ${state}`}>
                <Filter />
                <div className='members__grid'>
                    {items}
                </div>
            </div>
        );
    }
}

export default ViewMembers;  