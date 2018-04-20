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
        this.currentPage = 1;
    }

    onUrlChange() {
        actionsArticle.getList(this.currentPage);
    }

    onScrollBottom() {
        if (this.state.articles.totalPages > this.currentPage && this.currentPage === this.state.articles.currentPage) {
            this.currentPage++;
            actionsArticle.getList(this.currentPage);
        }
    }

    render() {
        const articles = this.state.articles.docs || [];
        return (
            <div className='articles' onWheel={this.onScoll.bind(this)} onTouchMove={this.onScoll.bind(this)}>
                <Link className='articles__button' to={'/articles/create'}>{tr("create")}</Link>
                <div className='articles__grid'>
                    {articles.map(article => <CardArticle
                        className='articles__grid__item'
                        article={article} key={article._id} />)}
                </div>
            </div>
        );
    }
}

export default ViewArticles;  