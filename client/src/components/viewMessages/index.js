import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import CardMember  from './cardMember';

class ViewMessages extends Reflux.Component {

    render() {

        const members = [];

        return (
            <div className='view-messages'>
                <div className='view-messages__list-members'>
                    {members.map(member => <CardMember
                        className='view-messages__list-members__item'
                        member={member} key={member._id} />)}
                </div>
                <div className='view-messages__list-conv'>

                </div>
            </div>
        );
    }
}

export default ViewMessages;  