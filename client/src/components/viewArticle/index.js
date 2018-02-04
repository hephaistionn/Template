import './style.scss';
import ComponentUrlWatched from './../common/componentUrlWatched';
import { Link } from 'react-router-dom';
import React from 'react';
import Moment from 'moment';
import { StoreArticle, actionsArticle } from '../../stores/article';
import { StoreMember } from '../../stores/member';

class ViewArticle extends ComponentUrlWatched {

    constructor(props) {
        super(props);
        this.stores = [StoreArticle, StoreMember];
    }
    urlUpdated() {
        const articleId = this.props.match.params.articleId;
        actionsArticle.get(articleId);
    }

    render() {
        const article = this.state.article;
        const currentMember = this.state.currentMember;
        const editButton = <Link to={'/articles/' + article._id + '/edit'}>{tr("edit")}</Link>;

        return (
            <div className='card-article'>
                <div>{article.title}</div>
                <div>{Moment(article.date).format("MMM Do YY")}</div>
                <div>{article.content}</div>
                {currentMember._id === article.owner && editButton}
            </div>
        );
    }
}

export default ViewArticle;  