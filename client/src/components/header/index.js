import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { actionsMain, StoreMain } from '../../stores/main';

class Header extends Reflux.Component {

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
            <div className='header'>
                <Link className='header__title' to={'/'}>{tr('Appication Title')}</Link>
                {session._id  && <a className='header__logout fas fa-sign-out-alt' onClick={this.logout}></a>}
            </div>
        );
    }
}

export default Header;
