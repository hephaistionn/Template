import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import Avatar from './../../../common/avatar';

class CardArticle extends Reflux.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const article = this.props.article;
        return (
            <div className='card-article'>
                <Avatar className='card-article__avatar' member={article.owner} />
                <div className='card-article__owner'>
                    <Link className='card-article__username' to={`/members/${article.owner._id}`}>
                        {article.owner.username}
                    </Link>
                    <div className='card-article__date'>{Moment(article.date).format('MMM Do YY')}</div>
                </div>
                <Link className='card-article__title' to={'/articles/' + article._id} >{article.title}</Link>
            </div>
        );
    }
}

export default CardArticle;  