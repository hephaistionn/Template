import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import { StoreMain, actionsMain } from '../../../stores/main';
import { Link } from 'react-router-dom';
import Input from '../../common/input';

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
            <div className='view-verify__confirm'>
                <Input
                    className='view-verify__input'
                    name='token'
                    type='text'
                    label={tr('code')}
                    autoComplete='off'
                    value={this.state.token || ''}
                    onChange={this.change.bind(this)} />
                <div
                    className='view-verify__button'
                    type='button'
                    onClick={this.verify.bind(this)}>
                    {tr('confirme')}
                </div>
                <Link className='' to={'/verify/request'}>{tr('send a verification email')}</Link>
            </div>
        );
    }
}

export default ViewVerify;  