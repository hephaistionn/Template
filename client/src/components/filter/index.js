import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import { StoreMember, actionsMember } from '../../stores/member';
import { StoreMain } from '../../stores/main';

import Input from './../common/input';
import Switch from './../common/switch';
import Checkbox from './../common/checkbox';
import Selector from './../common/selector';
import Range from './../common/range';

class Filter extends Reflux.Component {

    constructor(props) {
        super(props);
        this.stores = [StoreMember, StoreMain];
        this.state = {
            show: false,
            skills: '',
            online: false,
            working: false,
            expMin: undefined,
            expMax: undefined, 
            distance: 50
        };
    }

    forceShow() {
        this.setState({ show: !this.state.show });
    }

    change(value, filed) {
        this.setState({ [filed]: value });
    }

    filter() {
        const filter = {
            skills: this.state.skills ? this.state.skills.split(' ') : undefined,
            online: this.state.online || undefined,
            working: this.state.working || undefined,
            expMin: this.state.expMin || undefined,
            expMax: this.state.expMax || undefined,
            distance: this.state.distance || undefined,
            coords: this.state.session.loc
        }
        actionsMember.getList(filter);
        this.setState({ show: false });
    }

    render() {
        return (
            <div className={'filter' + (this.state.show ? ' show' : '')}>
                <div className='filter__button'
                    onClick={this.forceShow.bind(this)}
                ></div>
                <div className='filter__container'>
                    <Input className='filter__container__input'
                        value={this.state.skills}
                        onChange={this.change.bind(this)}
                        name='skills'
                        label={tr('skills')} />
                    <Checkbox
                        className='filter__container__checkbox'
                        value={this.state.online}
                        onChange={this.change.bind(this)}
                        name='online'
                        label={tr('online')} />
                    <Checkbox
                        className='filter__container__checkbox'
                        value={this.state.working}
                        onChange={this.change.bind(this)}
                        name='working'
                        label={tr('working')} />
                    <Range
                        className='filter__container__range'
                        valueMin={this.state.expMin}
                        valueMax={this.state.expMax}
                        nameMin='expMin'
                        nameMax='expMax'
                        optionsMin={this.state.optionsExperience}
                        optionsMax={this.state.optionsExperience}
                        onChange={this.change.bind(this)}
                        label={tr('experience')} />
                    <Selector 
                        className='filter__container__range'
                        name='distance'
                        value={this.state.distance}
                        label={tr('distance')}
                        options={this.state.optionsDistance}
                        onChange={this.change.bind(this)} />
                    <div
                        className='filter__container__button'
                        onClick={this.filter.bind(this)}>{tr('search')}</div>
                </div>
            </div>
        );
    }
}

export default Filter;