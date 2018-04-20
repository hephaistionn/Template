import './style.scss';
import React from 'react';

class Selector extends React.Component {

    onChange(event) {
        const name = this.props.name;
        const value = event.target.value;
        this.props.onChange(value, name);
    }

    render() {
        const options = this.props.options || [];

        return (
            <div className={'selector ' + (this.props.className || '')}>
                {this.props.label && <div className='selector__label'>{this.props.label}</div>}
                <div className='selector__wrap'>
                    <select
                        className='selector__value'
                        name={this.props.name}
                        value={this.props.value || ''}
                        onChange={this.onChange.bind(this)}>
                        {
                            options.map((option, index) =>
                                <option value={option.value} key={index}>
                                    {option.label}
                                </option>)
                        }
                    </select>
                </div>
            </div>
        );
    }
}

export default Selector;
