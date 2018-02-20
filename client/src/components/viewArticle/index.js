import './style.scss';
import ComponentUrlWatched from './../common/componentUrlWatched';
import { Link } from 'react-router-dom';
import React from 'react';
import Moment from 'moment';
import { StoreArticle, actionsArticle } from '../../stores/article';
import { StoreMain } from '../../stores/main';

class ViewArticle extends ComponentUrlWatched {

    constructor(props) {
        super(props);
        this.stores = [StoreArticle, StoreMain];
    }
    urlUpdated() {
        const articleId = this.props.match.params.articleId;
        actionsArticle.get(articleId);
    }

    render() {
        const article = this.state.article;
        const session = this.state.session;

        return (
            <div className='view-article'>
                <div className='view-article__previous fas fa-arrow-left'
                    aria-hidden='true'
                    onClick={this.props.history.goBack} />
                {session._id === article.owner && <Link
                    className='view-article__edit fas fa-edit'
                    to={'/articles/' + article._id + '/edit'} />}
                <div className='view-article__title'>{article.title}</div>
                <div className='view-article__date'>{Moment(article.date).format('MMM Do YY')}</div>
                <div className='view-article__content'>{article.content}</div>
            </div>
        );
    }
}

export default ViewArticle;  