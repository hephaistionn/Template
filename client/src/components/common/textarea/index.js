import './style.scss';
import React from 'react';

class TextArea extends React.Component {

    constructor(props) {
        super(props);
        this.state = { focus: false };
    }

    componentDidMount() {
        if(!this.props.autoResize) return;
        this.textarea.style.overflowY = 'hidden';
        setTimeout(()=> {
            if(!this.textarea.style) return;
            this.textarea.style.height = this.textarea.scrollHeight + 'px';
            this.autoResize()
        }, 50);

    }

    componentWillReceiveProps(nextProps) {
        this.autoResize();
    }

    autoResize(e) {
        if(!this.props.autoResize) return;  
        this.textarea.style.height = 'auto';
        this.textarea.style.height = this.textarea.scrollHeight + 'px';
    }

    onFocus() {
        this.setState({ focus: true });
    }

    onBlur() {
        this.setState({ focus: false });
    }

    render() {

        return (
            <div className={'textarea ' +
                (this.state.focus ? 'focus ' : '') +
                (this.props.value ? 'full ' : '') +
                (this.props.className || '')}>
                <div className='textarea__label'>{this.props.label}</div>
                <textarea
                    className='textarea__value'
                    name={this.props.name}
                    onInput={this.autoResize.bind(this)}
                    value={this.props.value || ''}
                    onBlur={this.onBlur.bind(this)}
                    onFocus={this.onFocus.bind(this)}
                    ref={(c) => this.textarea = c}
                    onChange={this.props.onChange} />
                <hr className='textarea__bar' />
            </div>
        );
    }
}

export default TextArea;
