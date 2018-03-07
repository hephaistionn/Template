import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import { StoreMain, actionsMain } from '../../../stores/main';
import Input from '../../common/input';

class ViewResetRequest extends Reflux.Component {

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

    getResetToken() {
        const email = this.state.email;
        actionsMain.getResetToken(email);
    }

    render() {
        return (
            <div className='view-reset__request'>
                <Input
                    className='view-reset__input'
                    name='email'
                    type='email'
                    label={tr('email')}
                    autoComplete='off'
                    value={this.state.email || ''}
                    onChange={this.change.bind(this)} />
                <div
                    className='view-reset__button'
                    type='button'
                    onClick={this.getResetToken.bind(this)}>
                    {tr('get a reset password authorization')}
                </div>
            </div>
        );
    }
}

export default ViewResetRequest;  