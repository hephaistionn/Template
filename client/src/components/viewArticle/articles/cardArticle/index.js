import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import Moment  from 'moment';
import { Link } from 'react-router-dom';
import Avatar from './../../../common/avatar';

class CardArticle extends Reflux.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const article  =  this.props.article;
        return (
            <Link className='card-article' to={'/articles/'+article._id}>
                <Avatar className='card-article__avatar' member={article.owner} />
                <Link className='card-article__username' to={`/members/${article.owner._id}`}>
                    {article.owner.username}
                </Link>
                <div className='card-article__title'>{article.title}</div>
                <div className='card-article__date'>{Moment(article.date).format('MMM Do YY')}</div>
            </Link>
        );
    }
}

export default CardArticle;  