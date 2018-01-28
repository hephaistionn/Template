import Reflux from 'reflux';
import React from 'react';

class Home extends Reflux.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='view_home'>
                HOME VIEW !
            </div>
        );
    }
}

export default Home;  