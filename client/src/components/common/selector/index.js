import './style.scss';
import React from 'react';

class Selector extends React.Component {

    render() {
        const options = this.props.options||[];

        return (
            <div className={'selector ' + (this.props.className || '')}>
                {this.props.label && <div className='selector__label'>{this.props.label}</div>}
                <div className='selector__wrap'>
                    <select
                        className='selector__value'
                        name={this.props.name}
                        value={this.props.value || ''}
                        onChange={this.props.onChange}> 
                        {
                            options.map(option =>
                                <option value={option.value} key={option.value}>
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
