import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import { StoreMain, actionsMain } from '../../../stores/main';
import { Link } from 'react-router-dom';
import Input from '../../common/input';

class ViewReset extends Reflux.Component {

    constructor(props) {
        super(props);
        this.store = StoreMain;
        this.state = { token: '', password1: '', password2: '' };
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
        if (password1 === password2) {
            actionsMain.reset(token, password1);
        } else {
            actionsMain.notif(tr('password not identical'));
        }
    }

    render() {
        return (
            <div className='view-reset__confirm'>
                <Input
                    className='view-reset__input'
                    name='token'
                    type='text'
                    label={tr('code')}
                    autoComplete='off'
                    value={this.state.token || ''}
                    onChange={this.change.bind(this)} />
                <Input
                    className='view-reset__input'
                    name='password1'
                    type='password'
                    label={tr('password')}
                    autoComplete='new-password'
                    value={this.state.password1 || ''}
                    onChange={this.change.bind(this)} />
                <Input
                    className='view-reset__input'
                    name='password2'
                    type='password'
                    label={tr('password confirmation')}
                    autoComplete='new-password'
                    value={this.state.password2 || ''}
                    onChange={this.change.bind(this)} />
                <div
                    className='view-reset__button'
                    type='button'
                    onClick={this.reset.bind(this)}>
                    {tr('confirme')}
                </div>
            </div>
        );
    }
}

export default ViewReset;  