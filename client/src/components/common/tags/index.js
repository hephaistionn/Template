import './style.scss';
import React from 'react';

class Tags extends React.Component {

    constructor(props) {
        super(props);
        this.colors = ['#9c27b0', '#03a9f4', '#ff5722', '#4caf50', '#f32134']
    }

    render() {
        const colors = this.colors;
        return (
            <div className={'tags ' + (this.props.className || '')}>
                <div className='tags__label'>{this.props.label}</div>
                <div className='tags__list'>
                    {
                        this.props.values && this.props.values.map((tag, index) => <div
                            className='tags__list__tag'
                            style={{backgroundColor: colors[Math.floor(Math.random() * colors.length)]}}
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
