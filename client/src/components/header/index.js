import Reflux from 'reflux';
import React from 'react';
import {Link, NavLink} from 'react-router-dom'

class Header extends Reflux.Component {

    render() {
        const nav = []; 
        nav.push(<NavLink key={2} className='' to={'/login'}
            activeClassName="selected">login</NavLink>);
        nav.push(<NavLink key={3} className='' to={'/signup'}
            activeClassName="selected">signup</NavLink>);

        return (
            <div className='view_header'>
                <div className="top-bar-left">
                    <Link className='title' to={'/'}><h1>Header VIEW !</h1></Link>
                </div>
                <section className="top-bar-right menu">
                    {nav}
                </section>
            </div>
        );
    }
}

export default Header;
