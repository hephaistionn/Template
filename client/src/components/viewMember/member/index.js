import './style.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { StoreMember, actionsMember } from '../../../stores/member';
import { StoreMain, actionsMain } from '../../../stores/main';
import ComponentUrlWatched from './../../common/componentUrlWatched';

class ViewMember extends ComponentUrlWatched {

    constructor(props) {
        super(props);
        this.stores = [StoreMember, StoreMain];
    }

    urlUpdated(params) {
        const memberId = params.memberId;
        actionsMember.get(memberId);
    }

    logout() {
        actionsMain.logout();
    }

    render() {
        const member = this.state.member;
        const session = this.state.session;
        // const state = this.getParam() ? 'optional' : '';

        return (
            <div className={`member`}>
                <div className='member__avatar'
                    style={member.avatar && { backgroundImage: `url(${member.avatar})` }} />
                <div className='member__username' >{member.username}</div>
                <div className='member__description' >{member.description}</div>
                <div className='member__previous fas fa-arrow-left'
                    aria-hidden='true'
                    onClick={this.props.history.goBack} />
                <Link
                    className={`member__edit fas fa-edit ${session._id !== member._id ? ' hide' : ''}`}
                    aria-hidden='true'
                    to={'/members/' + member._id + '/edit'}>
                </Link>
                <Link
                    className={`member__message fas fa-comment-alt ${session._id === member._id ? ' hide' : ''}`}
                    aria-hidden='true'
                    to={`/messages/${member._id}`}>
                </Link>
                <div className={`member__logout fas fa-sign-out-alt ${session._id !== member._id ? ' hide' : ''}`}
                    onClick={this.logout}
                />
            </div>
        );
    }
}

export default ViewMember;  