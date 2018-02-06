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
        const editButton = <Link to={'/articles/' + article._id + '/edit'}>{tr("edit")}</Link>;

        return (
            <div className='card-article'>
                <div>{article.title}</div>
                <div>{Moment(article.date).format("MMM Do YY")}</div>
                <div>{article.content}</div>
                {session._id === article.owner && editButton}
            </div>
        );
    }
}

export default ViewArticle;  