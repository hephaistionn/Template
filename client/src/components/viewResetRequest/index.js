import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import { StoreMain, actionsMain } from '../../stores/main';

class ViewResetRequest extends Reflux.Component {

    constructor(props) {
        super(props);
        this.store = StoreMain;
        this.state = { email: ''};
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
            <div className='view-reset-request'>
                <div className='pannel'>
                    <div className='label'>{tr('email')}</div>
                    <input
                        name='email'
                        type='email'
                        placeholder={tr('email')}
                        autoComplete='off'
                        value={this.state.email || ''}
                        onChange={this.change.bind(this)} />
                    <button
                        type='button'
                        onClick={this.getResetToken.bind(this)}>
                        {tr('get a reset password authorization')}
                    </button>
                </div>
            </div>
        );
    }
}

export default ViewResetRequest;  