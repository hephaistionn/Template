import './style.scss';
import { Link } from 'react-router-dom';
import React from 'react';
import Moment from 'moment';
import ComponentUrlWatched from './../../common/componentUrlWatched';
import { StoreArticle, actionsArticle } from '../../../stores/article';
import { StoreMain } from '../../../stores/main';
import Comments from './comments';
import Avatar from './../../common/avatar';

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
                <div className='article__previous'
                    aria-hidden='true'
                    onClick={this.props.history.goBack} />
                {session._id === article.owner._id && <Link
                    className='article__edit'
                    to={'/articles/' + article._id + '/edit'} />}
                <Avatar className='article__avatar' member={article.owner} />
                <Link className='article__username' to={`/members/${article.owner._id}`}>
                    {article.owner.username}
                </Link>
                <div className='article__title'>{article.title}</div>
                <div className='article__date'>{Moment(article.date).format('MMM Do YY')}</div> 
                <div className='article__content'>{article.content}</div>
                <Comments articleId={article._id} member={session}/>
            </div>
        );
    }
}

export default ViewArticle;  