import './style.scss';
import React from 'react';
import Selector from './../selector'

class Range extends React.Component {


    onChange(value, name) {
        this.props.onChange(value, name);
    }

    render() {
        const optionsMin = [{ label: this.props.label.substr(0, 3) + ' ' + tr('min'), value: '' }]
            .concat(this.props.optionsMin);
        const optionsMax = [{ label: this.props.label.substr(0, 3) + ' ' + tr('max'), value: '' }]
            .concat(this.props.optionsMax);

        return (
            <div className={'range ' + (this.props.className || '')}>
                <div className='range__label'>{this.props.label}</div>
                <Selector
                    className='range__min'
                    name={this.props.nameMin}
                    value={this.props.valueMin || ''}
                    options={optionsMin}
                    onChange={this.onChange.bind(this)} />
                <Selector
                    className='range__max'
                    name={this.props.nameMax}
                    value={this.props.valueMax || ''}
                    options={optionsMax}
                    onChange={this.onChange.bind(this)} />
            </div>
        );
    }
}

export default Range;
