import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import { StoreMain, actionsMain } from '../../stores/main';
import { Link } from 'react-router-dom';

class ViewVerify extends Reflux.Component {

    constructor(props) {
        super(props);
        this.store = StoreMain;
        this.state = { token: '' };
    }

    change(event) {
        const filed = event.target.name;
        const value = event.target.value;
        this.setState({ [filed]: value });
    }

    verify() {
        const token = this.state.token;
        actionsMain.verify(token);
    }

    render() {
        return (
            <div className='view-verify'>
                <div className='pannel'>
                    <div className='label'>{tr('code')}</div>
                    <input
                        name='token'
                        type='text'
                        placeholder={tr('code')}
                        autoComplete='off'
                        value={this.state.token || ''}
                        onChange={this.change.bind(this)} />
                    <button
                        type='button'
                        onClick={this.verify.bind(this)}>
                        {tr('confirme')}
                    </button>
                    <Link className='' to={'/verify/request'}>{tr('send a verification email')}</Link>
                </div>
            </div>
        );
    }
}

export default ViewVerify;  