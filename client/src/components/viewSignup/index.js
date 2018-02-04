import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import { StoreMember, actionsMember } from '../../stores/member';

class ViewSignup extends Reflux.Component {

    constructor(props) {
        super(props);
        this.store = StoreMember;
        this.state = { email: '', username: '', password: '', cgu: false };
    }

    change(event) {
        const filed = event.target.name;
        const value = event.target.value;
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
        actionsMember.signup(email, password, username, cgu);
    }

    render() {
        return (
            <div className='view-signup'>
                <div className='pannel'>
                    <div className='label'>{tr("email")}</div>
                    <input
                        name='email'
                        type='email'
                        placeholder={tr("email")}
                        value={this.state.email}
                        onChange={this.change.bind(this)} />
                    <div className='label'>{tr("username")}</div>
                    <input
                        name='username'
                        type='text'
                        placeholder={tr("username")}
                        autoComplete='off'
                        value={this.state.username}
                        onChange={this.change.bind(this)} />
                    <div className='label'>{tr("password")}</div>
                    <input
                        name='password'
                        type='password'
                        placeholder={tr("password")}
                        autoComplete="new-password"
                        value={this.state.password}
                        onChange={this.change.bind(this)} />
                    <div className='label'>{tr("cgu")}</div>
                    <input
                        type="checkbox"
                        checked={this.state.cgu}
                        onChange={this.changeCgu.bind(this)} />
                    <button
                        type="button"
                        onClick={this.signup.bind(this)}>
                        {tr("signup")}
                    </button>
                </div>
            </div>
        );
    }
}

export default ViewSignup;  