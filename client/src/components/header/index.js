import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { actionsMain, StoreMain } from '../../stores/main';
import Menu from './../common/menu';


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
        const status = location.pathname.split('/')[2] ? 'hidden' : '';

        const actions = [ 
            {label: tr('logout'), actionFn: this.logout.bind(this), classIcon:'fas fa-sign-out-alt'},
            {label: tr('profil'), link: `/members/${session._id}`, classIcon:'fas fa-user'}
        ];
 
        return (
            <div className={`header ${status}`}>
                <div className='header__container'>
                    <Link className='header__title' to={'/'}>{tr('Application Title')}</Link>
                    {session._id && <Menu className='header__menu' list={actions}/>}
                </div>
            </div>
        );
    }
}

export default Header;
