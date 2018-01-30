import './style.scss';
import Reflux from 'reflux';
import React from 'react';

class ViewArticle extends Reflux.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='view-article'>
                ViewArticle
            </div>
        );
    }
}

export default ViewArticle;  