import './style.scss';
import React from 'react';
import CardArticle from './cardArticle';
import { Link } from 'react-router-dom';
import ComponentUrlWatched from './../../common/componentUrlWatched';

import { StoreArticle, actionsArticle } from '../../../stores/article';

class ViewArticles extends ComponentUrlWatched {

    constructor(props) {
        super(props);
        this.store = StoreArticle;
    }

    urlUpdated() {
        actionsArticle.get();
    }

    render() {
        const articles = this.state.articles;
        return (
            <div className='articles'>
                <div className='articles__grid'>
                    {articles.map(article => <CardArticle
                        className='articles__grid__item'
                        article={article} key={article._id} />)}
                </div>
                <Link className='articles__button' to={'/articles/create'}>{tr("create")}</Link>
            </div>
        );
    }
}

export default ViewArticles;  