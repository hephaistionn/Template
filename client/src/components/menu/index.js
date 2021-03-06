import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { actionsMain, StoreMain } from '../../stores/main';

class MainMenu extends Reflux.Component {

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
            <div className='main-menu'>
                <div className='main-menu__container'>
                    <NavLink key={1} activeClassName='selected' className='main-menu__container__messages' to={'/messages'}></NavLink>
                    <NavLink key={2} activeClassName='selected' className='main-menu__container__articles' to={'/articles'}></NavLink>
                    <NavLink key={4} activeClassName='selected' className='main-menu__container__members' to={'/members'}></NavLink>
                </div>
            </div>
        );
    }
}

export default MainMenu;
