import React from 'react';

class Tag extends React.Component {

    constructor(props) {
        super(props);
        const colors = ['#9c27b0', '#03a9f4', '#ff5722', '#4caf50', '#f32134'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    render() {
        return (
            <div
                className={this.props.className || ''}
                style={{ backgroundColor: this.color }}>
                {this.props.value}
                <i className="tagger__list__tag__remove fas fa-trash"
                    aria-hidden="true" onClick={this.props.onClick}></i>
            </div>
        );
    }
}

export default Tag;