import './style.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { StoreMember, actionsMember } from '../../../stores/member';
import { StoreMain, actionsMain } from '../../../stores/main';
import ComponentUrlWatched from './../../common/componentUrlWatched';
import Tags from './../../common/tags';
import Property from './../../common/property';

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

        const avatar = member.avatar;
        const username = member.username;
        const description = member.description;
        const experience = this.state.optionsExperience[member.experience|0].label;
        const working = member.working?tr('yes'):tr('no');
        const skills = member.skills;
        const city = member.city;

        return (
            <div className={`member`}>
                <div className='member__avatar'
                    style={avatar && { backgroundImage: `url(${avatar})` }} />
                <div className='member__username' >{username}</div>
                <div className='member__description'>{description}</div>
                <Property className='member__property'  value={experience} label={tr('experience')}/>
                <Property className='member__property' value={working} label={tr('working')}/>
                <Property className='member__property' value={city} label={tr('city')}/>
                <Tags className='member__tags' values={skills} label={tr('skills')}/>
                <div className='member__button previous'
                    aria-hidden='true'
                    onClick={this.props.history.goBack} />
                <Link
                    className={`member__button edit ${session._id !== member._id ? ' hide' : ''}`}
                    aria-hidden='true'
                    to={'/members/' + member._id + '/edit'}>
                </Link>
                <Link
                    className={`member__button message ${session._id === member._id ? ' hide' : ''}`}
                    aria-hidden='true'
                    to={`/messages/${member._id}`}>
                </Link>
                <div className={`member__button logout ${session._id !== member._id ? ' hide' : ''}`}
                    onClick={this.logout}
                />
            </div>
        );
    }
}

export default ViewMember;  