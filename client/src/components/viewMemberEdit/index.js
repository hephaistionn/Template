import './style.scss';
import ComponentUrlWatched from './../common/componentUrlWatched';
import React from 'react';
import { StoreMember, actionsMember } from '../../stores/member';
import Dropzone from '../common/dropzone';

class ViewMemberEdit extends ComponentUrlWatched {

    constructor(props) {
        super(props);
        this.store = StoreMember;
    }

    urlUpdated() {
        const memberId = this.props.match.params.memberId;
        if (memberId) {
            actionsMember.get(memberId);
        }
    }

    save(event) {
        event.preventDefault();
        const id = this.state.member._id;
        const username = this.state.member.username;
        const avatar = this.state.member.avatar;
        actionsMember.update(id, username, avatar);
    }

    changed(event) {
        const value = event.target.value;
        const filed = event.target.name;
        actionsMember.change(filed, value);
    }

    onDropAvatar(files) {
        actionsMember.setPicture(files[0]);
    }

    render() {
        const member = this.state.member;
        return (
            <div className='card-member-edit'>
                <div className='label'>{tr('title')}</div>
                <input
                    type='text'
                    name='username'
                    placeholder={tr('username')}
                    value={member.username || ''}
                    onChange={this.changed.bind(this)} />
                <Dropzone onDrop={this.onDropAvatar}
                    url={member.avatar}>
                </Dropzone>
                <button
                    type='button'
                    onClick={this.save.bind(this)}>
                    {tr('save')}
                </button>
            </div>
        );
    }
}

export default ViewMemberEdit;  