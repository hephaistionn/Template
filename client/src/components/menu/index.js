import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { actionsMain, StoreMain } from '../../stores/main';

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
                <NavLink key={1} activeClassName='selected' className='fas fa-envelope' to={'/messages'}></NavLink>
                <NavLink key={2} activeClassName='selected' className='fas fa-globe' to={'/articles'}></NavLink>
                <NavLink key={4} activeClassName='selected' className='fas fa-address-card' to={'/members/'}></NavLink>
            </div>
        );
    }
}

export default Menu;
