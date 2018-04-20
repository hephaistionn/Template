import './style.scss';
import ComponentUrlWatched from './../../common/componentUrlWatched';
import React from 'react';
import { StoreMember, actionsMember } from '../../../stores/member';
import { actionsMain } from '../../../stores/main';
import { Link } from 'react-router-dom';
import Dropzone from '../../common/dropzone';
import Textarea from '../../common/textarea';
import Input from '../../common/input';
import Selector from '../../common/selector';
import Switch from '../../common/switch';
import Tagger from '../../common/tagger';
import InputCity from '../../common/inputCity';

class ViewMemberEdit extends ComponentUrlWatched {

    constructor(props) {
        super(props);
        this.store = StoreMember;
    }

    onUrlChange() {
        const memberId = this.props.match.params.memberId;
        if (memberId) {
            actionsMember.get(memberId);
        }
    }

    save(event) {
        event.preventDefault();
        const id = this.state.member._id;
        const fileds = {
            username: this.state.member.username,
            avatar:this.state.member.avatar,
            description:this.state.member.description,
            experience:this.state.member.experience,
            working:this.state.member.working,
            skills:this.state.member.skills,
            city:this.state.member.city,
            loc:this.state.member.loc
        }
        actionsMember.update(id, fileds);
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
                    onChange={this.changed.bind(this)} />
                <InputCity 
                    className='member-edit__city'
                    nameInput='city'
                    nameLoc='loc'
                    value={member.city}
                    label={tr('city')}
                    onChange={this.changed.bind(this)} />
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