import './style.scss';
import React from 'react';
import { Route } from 'react-router-dom'
import Member from './member';
import MemberEdit from './memberEdit';
import Members from './members';

class ViewMember extends React.Component {

    render() {
        return (
            <div className='view-member'>
                <Members />
                <Route exact path='/members/:memberId/edit' component={MemberEdit} />
                <Route exact path='/members/:memberId' component={Member} />
            </div>
        );
    }
}

export default ViewMember;  