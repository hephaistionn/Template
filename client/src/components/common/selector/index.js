import './style.scss';
import React from 'react';

class Selector extends React.Component {

    render() {
        return (
            <div className={'selector ' + (this.props.className || '')}>
                <div className='selector__label'>{this.props.label}</div>
                <select
                    className='selector__value'
                    name={this.props.name}
                    value={this.props.value || ''}
                    onChange={this.props.onChange}> 
                    {
                        this.props.options.map(option =>
                            <option value={option.value} key={option.value}>
                                {option.label}
                            </option>)
                    }
                </select>
            </div>
        );
    }
}

export default Selector;
