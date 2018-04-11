import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import { Link } from 'react-router-dom';
import { StoreMain, actionsMain } from '../../stores/main';
import Input from '../common/input';

class ViewSignin extends Reflux.Component {

    constructor(props) {
        super(props);
        this.store = StoreMain;
        this.state = { email: '', password: '' };
    }

    change(value, filed) {
        this.setState({ [filed]: value });
    }

    signin() {
        const email = this.state.email;
        const password = this.state.password;
        actionsMain.signin(email, password);
    }

    render() {
        return (
            <form className='view-signin'>
                <Input
                    className='view-signin__input'
                    name='email'
                    type='email'
                    label={tr('email')}
                    value={this.state.email || ''}
                    onChange={this.change.bind(this)} />
                <Input
                    className='view-signin__input'
                    name='password'
                    type='password'
                    label={tr('password')}
                    autoComplete='new-password'
                    value={this.state.password || ''}
                    onChange={this.change.bind(this)} />
                <div
                    className='view-signin__button'
                    onClick={this.signin.bind(this)}>
                    {tr('login')}
                </div>
                <Link className='' to={'/reset/request'}>{tr('reset password')}</Link>
            </form>
        );
    }
}

export default ViewSignin;  