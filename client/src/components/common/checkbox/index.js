import './style.scss';
import React from 'react';

class Checkbox extends React.Component {

    onClick() {
        const value = !this.props.value;
        const name = this.props.name;
        this.props.onChange(value, name);
    }

    render() {
        return (
            <div className={'checkbox ' + (this.props.className || '')}>
                <div className={'checkbox__box ' + (this.props.value ? 'checked' : '')}
                    onClick={this.onClick.bind(this)}>
                    <span className='checkbox__box__value'></span>
                </div>
                <div className='checkbox__label'>{this.props.label}</div>
            </div>
        );
    }
}

export default Checkbox;
