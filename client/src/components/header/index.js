import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { actionsMain, StoreMain } from '../../stores/main';
import Avatar from './../common/avatar';


class Header extends Reflux.Component {

    constructor(props) {
        super(props);
        this.store = StoreMain;
    }

    render() {
        const session = this.state.session;
        const id = location.pathname.split('/')[2];
        const status = (id && id.length > 10) ? 'hidden' : '';

        return (
            <div className={`header ${status}`}>
                <div className='header__container'>
                    <Link className='header__title' to={'/'}>{tr('Application Title')}</Link>
                    {session._id && <Avatar className='header__avatar' member={session}/>}
                </div>
            </div>
        );
    }
}

export default Header;
