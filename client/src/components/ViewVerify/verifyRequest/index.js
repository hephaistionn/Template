import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import { StoreMain, actionsMain } from '../../../stores/main';
import Input from '../../common/input';

class ViewVerifyRequest extends Reflux.Component {

    constructor(props) {
        super(props);
        this.store = StoreMain;
        this.state = { email: '' };
    }

    change(event) {
        const filed = event.target.name;
        const value = event.target.value;
        this.setState({ [filed]: value });
    }

    getVerifyToken() {
        const email = this.state.email;
        actionsMain.getVerifyToken(email);
    }

    render() {
        return (
            <div className='view-verify__request'>
                <Input
                    className='view-verify__input'
                    name='email'
                    type='email'
                    label={tr('code')}
                    autoComplete='off'
                    value={this.state.email || ''}
                    onChange={this.change.bind(this)} />
                <div
                    className='view-verify__button'
                    onClick={this.getVerifyToken.bind(this)}>
                    {tr('send a verification email')}
                </div>
            </div>
        );
    }
}

export default ViewVerifyRequest;  