import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import Moment  from 'moment';
import { Link } from 'react-router-dom';

class CardArticle extends Reflux.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const article  =  this.props.article;
        return (
            <Link className='card-article' to={'/articles/'+article._id}>
                <div>{article.title}</div>
                <div>{Moment(article.date).format('MMM Do YY')}</div>
            </Link>
        );
    }
}

export default CardArticle;  