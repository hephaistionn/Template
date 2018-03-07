import './style.scss';
import { Link } from 'react-router-dom';
import React from 'react';
import Moment from 'moment';
import ComponentUrlWatched from './../../common/componentUrlWatched';
import { StoreArticle, actionsArticle } from '../../../stores/article';
import { StoreMain } from '../../../stores/main';
import Comments from './comments';

class ViewArticle extends ComponentUrlWatched {

    constructor(props) {
        super(props);
        this.stores = [StoreArticle, StoreMain];
    }
    urlUpdated(params) {
        const articleId = params.articleId;
        actionsArticle.get(articleId);
    }

    render() {
        const article = this.state.article;
        const session = this.state.session;

        if (!article._id) return <div />

        return (
            <div className='article'>
                <div className='article__previous fas fa-arrow-left'
                    aria-hidden='true'
                    onClick={this.props.history.goBack} />
                {session._id === article.owner && <Link
                    className='article__edit fas fa-edit'
                    to={'/articles/' + article._id + '/edit'} />}
                <div className='article__title'>{article.title}</div>
                <div className='article__date'>{Moment(article.date).format('MMM Do YY')}</div> 
                <div className='article__content'>{article.content}</div>
                <Comments articleId={article._id} member={session}/>
            </div>
        );
    }
}

export default ViewArticle;  