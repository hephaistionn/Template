import './style.scss';
import React from 'react';
import { Route } from 'react-router-dom'

import VerifyConfirm from './verifyConfirm';
import VerifyRequest from './verifyRequest';

class ViewVerify extends React.Component {

    render() {
        return (
            <div className='view-verify'>
                <Route exact path='/verify/confirm' component={VerifyConfirm} />
                <Route exact path='/verify/request' component={VerifyRequest} />
            </div>
        );
    }
}

export default ViewVerify;  