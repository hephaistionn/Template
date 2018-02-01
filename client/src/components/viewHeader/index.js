import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { actionsMember } from '../../stores/member';

class ViewHeader extends Reflux.Component {

    logout() {
        const redirect = '/signin'; 
        actionsMember.logout(redirect);
    }

    render() {
        const nav = [
            <a key={0} className='' onClick={this.logout}>logout</a>,
            <NavLink key={1} activeClassName="selected" to={'/signin'}>signin</NavLink>,
            <NavLink key={2} activeClassName="selected" to={'/signup'}>signup</NavLink>,
            <NavLink key={3} activeClassName="selected" to={'/messages'}>messages</NavLink>,
            <NavLink key={4} activeClassName="selected" to={'/articles'}>articles</NavLink>,
            <NavLink key={5} activeClassName="selected" to={'/article'}>article</NavLink>,
            <NavLink key={6} activeClassName="selected" to={'/profile'}>profile</NavLink>];

        return (
            <div className='view-header'>
                <div className="view-header__left">
                    <Link className='title' to={'/'}>{tr("Hello World")}</Link>
                </div>
                <section className="view-header__right">
                    {nav}
                </section>
            </div>
        );
    }
}

export default ViewHeader;
