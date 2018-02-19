import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

class ViewHome extends Reflux.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='view-home'>
                <h1 className='view-home__title'  >{tr('Appication Title')}</h1>
                <p className='view-home__description' >{tr('Appication Description, Write a simple but effective slogan.')}</p>
                <Link className='view-home__button' to={'/signin'}>signin</Link>
                <Link className='view-home__button' to={'/signup'}>signup</Link>
            </div>
        );
    }
}

export default ViewHome;  