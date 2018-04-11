import './style.scss';
import React from 'react';

class Input extends React.Component {

    constructor(props) {
        super(props);
        this.state = { focus: false };
    }

    onChange() {
        const name = event.target.name;
        const value = event.target.value;
        this.props.onChange(value, name);
    }

    onFocus() {
        this.setState({ focus: true });
    }

    onBlur() {
        this.setState({ focus: false });
    }

    render() {
        return (
            <div className={'input ' +
                (this.state.focus ? 'focus ' : '') +
                (this.props.value ? 'full ' : '') +
                (this.props.className || '')}>
                <input
                    className='input__value'
                    name={this.props.name}
                    autoFocus={this.props.autoFocus}
                    type={this.props.type}
                    autoComplete={this.props.autoComplete}
                    value={this.props.value || ''}
                    onBlur={this.onBlur.bind(this)}
                    onFocus={this.onFocus.bind(this)}
                    onChange={this.onChange} />
                <div className='input__label'>{this.props.label}</div>
                <hr className='input__bar' />
            </div>
        );
    }
}

export default Input;
