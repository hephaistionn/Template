import './style.scss';
import Reflux from 'reflux';
import React from 'react';

import { StoreArticle, actionsArticle } from '../../stores/article';

class ViewArticles extends Reflux.Component {

    constructor(props) {
        super(props);
        this.store = StoreArticle;
    }

    componentDidMount() {
        this.refresh();
    }

    componentWillReceiveProps(nextProps) {
        const nextPath = nextProps.location.pathname;
        const previousPath = this.props.location.pathname;
        if(previousPath !== nextPath &&  this.props.match.url===nextPath.slice(0, -1)) {
            this.refresh();
        }
    }

    refresh(){
        actionsArticle.getAll();
    }

    render() {
        return (
            <div className='view-articles'>
                ViewArticles
            </div>
        );
    }
}

export default ViewArticles;  