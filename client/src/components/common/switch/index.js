import './style.scss';
import React from 'react';

class Switch extends React.Component {

    onClick() {
        const value = !this.props.value;
        const name = this.props.name;
        this.props.onChange(value, name);
    }

    render() {
        return (
            <div className={'switch ' + (this.props.className || '')}>
                <div className='switch__label'>{this.props.label}</div>
                <div className={'switch__slider ' + (this.props.value ? 'checked' : '')}
                    onClick={this.onClick.bind(this)}>
                    <span className='switch__slider__value'></span>
                </div>
            </div>
        );
    }
}

export default Switch;
