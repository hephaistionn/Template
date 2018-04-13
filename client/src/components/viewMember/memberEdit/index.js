import './style.scss';
import ComponentUrlWatched from './../../common/componentUrlWatched';
import React from 'react';
import { StoreMember, actionsMember } from '../../../stores/member';
import { Link } from 'react-router-dom';
import Dropzone from '../../common/dropzone';
import Textarea from '../../common/textarea';
import Input from '../../common/input';
import Selector from '../../common/selector';
import Switch from '../../common/switch';
import Tagger from '../../common/tagger';

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
        const description = this.state.member.description;
        const experience = this.state.member.experience;
        const working = this.state.member.working;
        const skills = this.state.member.skills;
        actionsMember.update(id, username, avatar, description,
            experience, working, skills);
    }

    changed(value, filed) {
        actionsMember.change(filed, value);
    }

    onDropAvatar(files) {
        actionsMember.setPicture(files[0]);
    }

    render() {
        const member = this.state.member;
        return (
            <div className='member-edit  large'>
                <Dropzone onDrop={this.onDropAvatar}
                    className='member-edit__avatar'
                    url={member.avatar}>
                </Dropzone>
                <Input
                    type='text'
                    className='member-edit__username'
                    name='username'
                    label={tr('username')}
                    value={member.username || ''}
                    onChange={this.changed.bind(this)} />
                <Textarea
                    type='text'
                    className='member-edit__description'
                    name='description'
                    autoResize={true}
                    label={tr('description')}
                    value={member.description || ''}
                    onChange={this.changed.bind(this)} />
                <Selector
                    className='member-edit__experience'
                    name='experience'
                    value={member.experience}
                    label={tr('experience')}
                    options={this.state.optionsExperience}
                    onChange={this.changed.bind(this)} />
                <Switch
                    className='member-edit__working'
                    name='working'
                    value={member.working}
                    label={tr('working')}
                    onChange={this.changed.bind(this)} />
                <Tagger
                    className='member-edit__skills'
                    tags={member.skills}
                    name='skills'
                    label={tr('skills')}
                    onChange={this.changed.bind(this)}
                />
                <div
                    className='member-edit__button save'
                    aria-hidden='true'
                    onClick={this.save.bind(this)} />
                <div
                    className='member-edit__button previous'
                    aria-hidden='true'
                    onClick={this.props.history.goBack} />
            </div>
        );
    }
}

export default ViewMemberEdit;  