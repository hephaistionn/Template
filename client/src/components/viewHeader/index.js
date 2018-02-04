import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { actionsMember, StoreMember } from '../../stores/member';

class ViewHeader extends Reflux.Component {

    constructor(props) {
        super(props);
        this.store = StoreMember;
    }

    logout() {
        actionsMember.logout();
    }

    render() {
        const currentMember = this.state.currentMember;

        const nav = currentMember._id ?
            [
                <NavLink key={3} activeClassName="selected" to={'/messages'}>messages</NavLink>,
                <NavLink key={4} activeClassName="selected" to={'/articles'}>articles</NavLink>,
                <NavLink key={6} activeClassName="selected" to={'/members/' + currentMember._id}>me</NavLink>,
                <NavLink key={7} activeClassName="selected" to={'/members/'}>profiles</NavLink>,
                <a key={0} className='' onClick={this.logout}>logout</a>
            ] :
            [
                <NavLink key={1} activeClassName="selected" to={'/signin'}>signin</NavLink>,
                <NavLink key={2} activeClassName="selected" to={'/signup'}>signup</NavLink>
            ];

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
