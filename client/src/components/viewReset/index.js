import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import { StoreMain, actionsMain } from '../../stores/main';
import { Link } from 'react-router-dom';

class ViewReset extends Reflux.Component {

    constructor(props) {
        super(props);
        this.store = StoreMain;
        this.state = { token: '', password1: '', password2: ''};
    }

    change(event) {
        const filed = event.target.name;
        const value = event.target.value;  
        this.setState({ [filed]: value });
    }

    reset() {
        const token = this.state.token;
        const password1 = this.state.password1;
        const password2 = this.state.password2;
        if(password1 ===  password2) {
            actionsMain.reset(token, password1);
        } else {
            actionsMain.notif(tr('password not identical'));
        }
    }

    render() {
        return (
            <div className='view-reset'>
                <div className='pannel'>
                    <div className='label'>{tr("code")}</div>
                    <input
                        name='token'
                        type='text'
                        placeholder={tr("code")}
                        autoComplete='off'
                        value={this.state.token || ''}
                        onChange={this.change.bind(this)} />
                    <div className='label'>{tr("password")}</div>
                    <input
                        name='password1'
                        type='password'
                        placeholder={tr("password")}
                        autoComplete="new-password"
                        value={this.state.password1 || ''}
                        onChange={this.change.bind(this)} />
                    <div className='label'>{tr("password confirmation")}</div>
                    <input
                        name='password2'
                        type='password'
                        placeholder={tr("password")}
                        autoComplete="new-password"
                        value={this.state.password2 || ''}
                        onChange={this.change.bind(this)} />
                    <button
                        type="button"
                        onClick={this.reset.bind(this)}>
                        {tr("confirme")}
                    </button>
                </div>
            </div>
        );
    }
}

export default ViewReset;  