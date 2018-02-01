import './style.scss';
import React from 'react';
import CardArticle from './cardArticle';
import ComponentUrlWatched from './../common/componentUrlWatched';

import { StoreArticle, actionsArticle } from '../../stores/article';

class ViewArticles extends ComponentUrlWatched {

    constructor(props) {
        super(props);
        this.store = StoreArticle;
    }

    urlUpdated() {
        actionsArticle.getAll();
    }

    render() {
        const articles = this.state.articles;
        return (
            <div className='view-articles'>
                <div>ViewArticles</div>    
                <div className='container-card'>
                    {articles.map(article => <CardArticle  article={article} key={article._id}/>)}   
                </div>
            </div>
        );
    }
}

export default ViewArticles;  