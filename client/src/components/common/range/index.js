import './style.scss';
import React from 'react';
import Selector from './../selector'

class Range extends React.Component {


    onChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.props.onChange(value, name) ;
    }

    render() {
        return (
            <div className={'range ' + (this.props.className || '')}>
                <div className='range__label'>{this.props.label}</div>
                <Selector
                    className='range__min'
                    name={this.props.nameMin}
                    value={this.props.valueMin || ''}
                    options={this.props.optionsMin}
                    onChange={this.onChange.bind(this)} />
                <Selector
                    className='range__max'
                    name={this.props.nameMax}
                    value={this.props.valueMax || ''}
                    options={this.props.optionsMax}
                    onChange={this.onChange.bind(this)} />
            </div>
        );
    }
}

export default Range;
