import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import { StoreMember, actionsMember } from '../../stores/member';

class ViewSignin extends Reflux.Component {

    constructor(props) {
        super(props);
        this.store = StoreMember;
        this.state = { email: '', password: '' };
    }

    change(event) {
        const filed = event.target.name;
        const value = event.target.value;
        this.setState({ [filed]: value });
    }

    signin() {
        const email = this.state.email;
        const password = this.state.password;
        actionsMember.signin(email, password);
    }

    render() {
        return (
            <div className='view-signin'>
                <div className='pannel'>
                    <input
                        name='email'
                        type='email'
                        placeholder={tr("email")}
                        value={this.state.email}
                        onChange={this.change.bind(this)} />
                    <input
                        name='password'
                        type='password'
                        placeholder={tr("password")}
                        autoComplete="new-password"
                        value={this.state.password}
                        onChange={this.change.bind(this)} />
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