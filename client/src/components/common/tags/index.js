import './style.scss';
import React from 'react';

class Tags extends React.Component {

    render() {
        return (
            <div className={'tags ' + (this.props.className || '')}>
                <div className='tags__label'>{this.props.label}</div>
                <div className='tags__list'>
                    {
                        this.props.values && this.props.values.map((tag, index) => <div
                            className='tags__list__tag'
                            key={index}>
                            {tag}
                        </div>)
                    }
                </div>
            </div>
        );
    }
}

export default Tags;
