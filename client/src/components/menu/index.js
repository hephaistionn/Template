import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { actionsMain, StoreMain } from '../../stores/main';
import Avatar from '../common/avatar';

class Menu extends Reflux.Component {

    constructor(props) {
        super(props);
        this.store = StoreMain;
    }

    logout() {
        actionsMain.logout();
    }

    render() {
        const session = this.state.session;

        return (
            <div className='menu'>
                <Avatar member={session}/>
                <NavLink key={1} activeClassName='selected' to={'/messages'}>messages</NavLink>
                <NavLink key={2} activeClassName='selected' to={'/articles'}>articles</NavLink>
                <NavLink key={4} activeClassName='selected' to={'/members/'}>profiles</NavLink>
            </div>
        );
    }
}

export default Menu;
