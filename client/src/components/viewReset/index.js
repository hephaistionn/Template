import './style.scss';
import React from 'react';
import { Route } from 'react-router-dom'

import ResetConfirm from './resetConfirm';
import ResetRequest from './resetRequest';

class ViewReset extends React.Component {

    render() {
        return (
            <div className='view-reset'>
                <Route exact path='/reset/confirm' component={ResetConfirm} />
                <Route exact path='/reset/request' component={ResetRequest} />
            </div>
        );
    }
}

export default ViewReset;  