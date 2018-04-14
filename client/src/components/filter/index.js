import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import { StoreMember, actionsMember } from '../../stores/member';

import Input from './../common/input';
import Switch from './../common/switch';
import Checkbox from './../common/checkbox';
import Selector from './../common/selector';
import Range from './../common/range';

class Filter extends Reflux.Component {

    constructor(props) {
        super(props);
        this.store = StoreMember;
        this.state = {
            show: false,
            skills: '',
            online: false,
            working: false,
            expMin: 0,
            expMax: 2
        };
    }

    forceShow() {
        this.setState({ show: !this.state.show });
    }

    change(value, filed) {
        this.setState({ [filed]: value });
    }

    update() {
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
                        onChange={this.change.bind(this)}
                        nameMin='expMin' 
                        nameMin='expMax'
                        optionsMin={this.state.optionsExperience}
                        optionsMax={this.state.optionsExperience}
                        label={tr('experience')} />
                    <div
                        className='filter__container__button'
                        onClick={this.update.bind(this)}>{tr('search')}</div>
                </div>
            </div>
        );
    }
}

export default Filter;