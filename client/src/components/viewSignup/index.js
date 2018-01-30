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

    updateEmail(event) {
        const value = event.target.value;
        this.setState({ email: value });
    }

    updateUsername(event) {
        const value = event.target.value;
        this.setState({ username: value });
    }

    updatePassword(event) {
        const value = event.target.value;
        this.setState({ password: value });
    }

    updateCgu() {
        const value = !this.state.cgu;
        this.setState({ cgu: value });
    }

    render() {
        return (
            <div className='view-signup'>

                <div className='pannel'>
                    <div className='label'>{tr("email")}</div>
                    <input
                        type='email'
                        placeholder={tr("email")}
                        value={this.state.email}
                        onChange={this.updateEmail.bind(this)} />
                    <div className='label'>{tr("username")}</div>
                    <input
                        type='text'
                        placeholder={tr("username")}
                        autoComplete='off'
                        value={this.state.username}
                        onChange={this.updateUsername.bind(this)} />
                    <div className='label'>{tr("password")}</div>
                    <input
                        type='password'
                        placeholder={tr("password")}
                        autoComplete="new-password"
                        value={this.state.password}
                        onChange={this.updatePassword.bind(this)} />
                    <div className='label'>{tr("cgu")}</div>
                    <input
                        type="checkbox"
                        checked={this.state.cgu}
                        onChange={this.updateCgu.bind(this)} />
                </div>
            </div>
        );
    }
}

export default ViewSignup;  