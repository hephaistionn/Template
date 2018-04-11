import './style.scss';
import React from 'react';

class Tagger extends React.Component {

    constructor(props) {
        super(props);
        this.state = { focus: false, value: '' };
    }

    addTag() {
        if (!this.state.value) return;
        const value = this.props.tags.concat(this.state.value);
        const name = this.props.name;
        this.props.onChange(value, name);
        this.setState({ value: '' });
    }

    removeTag(index) {
        const value = this.props.tags.slice();
        value.splice(index, 1);
        const name = this.props.name;
        this.props.onChange(value, name);
    }

    onChange(event) {
        const value = event.target.value;
        this.setState({ value: value });
    }

    onFocus() {
        this.setState({ focus: true });
    }

    onBlur() {
        this.setState({ focus: false });
    }

    onKeyPress(event) {
        if (event.charCode == 13) {
            this.addTag();
        }
    }

    render() {
        return (
            <div className={'tagger ' +
                (this.props.value ? 'full ' : '') +
                (this.state.focus ? 'focus ' : '') +
                (this.props.className || '')}>
                <div className='tagger__label'>{this.props.label}</div>
                <div className='tagger__form'>
                    <input
                        className='tagger__input'
                        name={this.props.name}
                        type='text'
                        maxLength='15'
                        value={this.state.value}
                        onKeyPress={this.onKeyPress.bind(this)}
                        onBlur={this.onBlur.bind(this)}
                        onFocus={this.onFocus.bind(this)}
                        onChange={this.onChange.bind(this)} />
                    <div
                        className='tagger__button'
                        onClick={this.addTag.bind(this)}>
                        {tr('add')}
                    </div>
                    <hr className='tagger__bar' />
                </div>
                <div className='tagger__list'>
                    {
                        this.props.tags && this.props.tags.map((tag, index) => <div
                            className='tagger__list__tag'
                            key={index}>
                            <span>{tag}</span>
                            <i className="tagger__list__tag__remove fa fa-times fa-1x"
                                aria-hidden="true" onClick={this.removeTag.bind(this, index)}></i>
                        </div>)
                    }
                </div>
            </div>
        );
    }
}

export default Tagger;
