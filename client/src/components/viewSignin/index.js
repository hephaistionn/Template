import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import { StoreMember, actionsMember } from '../../stores/member';

class ViewSignin extends Reflux.Component {

    constructor(props) {
        super(props);
        this.store = StoreMember;
        this.state = { email: '', password: ''};
    }

    updateEmail(event) {
        const value = event.target.value;
        this.setState({ email: value });
    }

    updatePassword(event) {
        const value = event.target.value;
        this.setState({ password: value });
    }

    signin() {
        const email = this.state.email;
        const password = this.state.password;
        const redirect = '/';
        actionsMember.signin(email, password, redirect);
    }

    render() {
        return (
            <div className='view-signin'>
                <div className='pannel'>
                    <input
                        type='email'
                        placeholder={tr("email")}
                        value={this.state.email}
                        onChange={this.updateEmail.bind(this)} />
                    <input
                        type='password'
                        placeholder={tr("password")}
                        autoComplete="new-password"
                        value={this.state.password}
                        onChange={this.updatePassword.bind(this)} />
                    <button 
                        type="button" 
                        onClick={this.signin.bind(this)}>
                        {tr("login")}
                    </button>
                </div>
            </div>
        );
    }
}

export default ViewSignin;  