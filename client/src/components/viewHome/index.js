import './style.scss';
import Reflux from 'reflux';
import React from 'react';

class ViewHome extends Reflux.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='view-home'>
                ViewHome
            </div>
        );
    }
}

export default ViewHome;  