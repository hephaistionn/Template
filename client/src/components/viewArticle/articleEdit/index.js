import './style.scss';
import ComponentUrlWatched from './../../common/componentUrlWatched';
import React from 'react';
import { StoreArticle, actionsArticle } from '../../../stores/article';
import Textarea from '../../common/textarea';
import Input from '../../common/input';

class ViewArticleEdit extends ComponentUrlWatched {

    constructor(props) {
        super(props);
        this.store = StoreArticle;
    }

    urlUpdated() {
        const articleId = this.props.match.params.articleId;
        if (articleId) {
            actionsArticle.get(articleId);
        }
    }

    save(event) {
        event.preventDefault();
        const id = this.state.article._id;
        const title = this.state.article.title;
        const content = this.state.article.content;
        if (id) {
            actionsArticle.update(id, title, content);
        } else {
            actionsArticle.create(title, content);
        }
    }

    change(event) {
        const value = event.target.value;
        const filed = event.target.name;
        actionsArticle.change(filed, value);
    }

    render() {
        const article = this.state.article;
        return (
            <div className='article-edit'>
                <div
                    className='article-edit__save fas fa-save'
                    aria-hidden='true'
                    onClick={this.save.bind(this)}/>
                <div 
                    className='article-edit__previous fas fa-arrow-left'
                    aria-hidden='true'
                    onClick={this.props.history.goBack}/>
                <Input
                    className='article-edit__title'
                    type='text'
                    name='title'
                    label={tr('title')}
                    value={article.title || ''}
                    onChange={this.change.bind(this)} />
                <Textarea
                    className='article-edit__content'
                    type='text'
                    name='content'
                    label={tr('content')}
                    value={article.content || ''}
                    onChange={this.change.bind(this)} />
            </div>
        );
    }
}

export default ViewArticleEdit;  