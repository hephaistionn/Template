import './style.scss';
import ComponentUrlWatched from './../common/componentUrlWatched';
import React from 'react';
import { StoreMember, actionsMember } from '../../stores/member';

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
        actionsMember.update(id, username);
    }

    changed(event) {
        const value = event.target.value;
        const filed = event.target.name;
        actionsMember.change(filed, value);
    }

    render() {
        const member = this.state.member;
        return (
            <div className='card-member-edit'>
                <div className='label'>{tr("title")}</div>
                <input
                    type='text'
                    name='username'
                    placeholder={tr("username")}
                    value={member.username}
                    onChange={this.changed.bind(this)} />
                <button
                    type="button"
                    onClick={this.save.bind(this)}>
                    {tr("save")}
                </button>
            </div>
        );
    }
}

export default ViewMemberEdit;  