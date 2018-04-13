import './style.scss';
import Reflux from 'reflux';
import React from 'react';

import Input from './../common/input';
import Switch from './../common/switch';
import Checkbox from './../common/checkbox';
import Selector from './../common/selector';

class Filter extends React.Component {

    constructor(props) {
        super(props);
        this.state = { show: false };
    }

    forceShow() {
        this.setState({ show: true });
    }

    render() {
        return (
            <div className={'filter' + (this.state.show ? ' show' : '')}>
                <div className='filter__button'
                    onClick={this.forceShow.bind(this)}
                ></div>
                <div className='filter__container'></div>
            </div>
        );
    }
}

export default Filter;