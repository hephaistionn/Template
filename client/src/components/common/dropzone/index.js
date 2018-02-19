import './style.scss';
import React from 'react';
import Dropzone from 'react-dropzone'

class Drop extends React.Component {

    render() {
        let style = null;
        if (this.props.url) {
            style = { backgroundImage: 'url(' + (this.props.url) + ')' }
        }

        return (
            <div className={'dropzone-container ' + (this.props.className || '')}>
                <div className='dropzone-container__label'>{this.props.label}</div>
                <Dropzone multiple={false} onDrop={this.props.onDrop}
                    style={style}
                    className='dropzone-container__dropzone'>
                    <div className='dropzone-container__upload-label'>Upload</div>
                </Dropzone>
            </div>
        )
    }
}

export default Drop;