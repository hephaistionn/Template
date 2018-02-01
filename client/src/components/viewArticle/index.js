import './style.scss';
import ComponentUrlWatched from './../common/componentUrlWatched';
import React from 'react';
import Moment  from 'moment';
import { StoreArticle, actionsArticle } from '../../stores/article';

class ViewArticle extends ComponentUrlWatched {

    constructor(props) {
        super(props);
        this.store = StoreArticle;
    }
    urlUpdated(){
        const articleId = this.props.match.params.articleId;
        actionsArticle.get(articleId);
    }

    render() {
        const article  =  this.state.article;
        return (
            <div className='card-article'>
                <div>{article.title}</div>
                <div>{Moment(article.date).format("MMM Do YY")}</div>
                <div>{article.content}</div>
            </div>
        );
    }
}

export default ViewArticle;  