import './style.scss';
import React from 'react';

class Property extends React.Component {

    render() {
        return (
            <div className={'property ' + (this.props.className || '')}>
                <div className='property__label'>{this.props.label}</div>
                <div className='property__value'>{this.props.value}</div>
            </div>
        );
    }
}

export default Property;
