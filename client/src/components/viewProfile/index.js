import './style.scss';
import Reflux from 'reflux';
import React from 'react';

class ViewProfile extends Reflux.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='view-profile'>
                ViewProfile
            </div>
        );
    }
}

export default ViewProfile;  