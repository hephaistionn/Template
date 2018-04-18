import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import { StoreMain, actionsMain } from '../../stores/main';
import Input from '../common/input';

class ViewSignup extends Reflux.Component {

    constructor(props) {
        super(props);
        this.store = StoreMain;
        this.state = { email: '', username: '', password: '', cgu: false };
        actionsMain.autoloc();
    }

    change(value, filed) {
        this.setState({ [filed]: value });
    }

    changeCgu() {
        const value = !this.state.cgu;
        this.setState({ cgu: value });
    }

    signup() {
        const email = this.state.email;
        const username = this.state.username;
        const password = this.state.password;
        const cgu = this.state.cgu;
        const city = this.state.city;
        const loc = this.state.loc;
        actionsMain.signup(email, password, username, cgu, city, loc);
    }

    render() {
        return (
            <div className='view-signup'>
                <Input
                    className='view-signup__input'
                    name='email'
                    type='email'
                    label={tr("email")}
                    value={this.state.email || ''}
                    onChange={this.change.bind(this)} />
                <Input
                    className='view-signup__input'
                    name='username'
                    type='text'
                    label={tr("username")}
                    autoComplete='off'
                    value={this.state.username || ''}
                    onChange={this.change.bind(this)} />
                <Input
                    className='view-signup__input'
                    name='password'
                    type='password'
                    label={tr("password")}
                    autoComplete="new-password"
                    value={this.state.password || ''}
                    onChange={this.change.bind(this)} />
                <input
                    className='view-signup__input'
                    type="checkbox"
                    checked={this.state.cgu}
                    onChange={this.changeCgu.bind(this)} />
                <div
                    className='view-signup__button'
                    onClick={this.signup.bind(this)}>
                    {tr("signup")}
                </div>
            </div>
        );
    }
}

export default ViewSignup;  