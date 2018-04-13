import './style.scss';
import React from 'react';
import Selector from './../selector'

class Range extends React.Component {

    render() {
        return (
            <div className={'range ' + (this.props.className || '')}>
                <div className='range__label'>{this.props.label}</div>
                <selector
                    className='range__min'
                    name={this.props.nameMin}
                    value={this.props.valueMin || ''}
                    options={this.props.optionsMin}
                    onChange={this.props.onChange} />
                <select
                    className='range__max'
                    name={this.props.nameMax}
                    value={this.props.valueMax || ''}
                    options={this.props.optionsMax}
                    onChange={this.props.onChange} />
            </div>
        );
    }
}

export default Range;
