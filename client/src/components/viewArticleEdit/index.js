import './style.scss';
import ComponentUrlWatched from './../common/componentUrlWatched';
import React from 'react';
import { StoreArticle, actionsArticle } from '../../stores/article';

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
            <div className='card-article-edit'>
                <div className='label'>{tr("title")}</div>
                <input
                    type='text'
                    name='title'
                    placeholder={tr("title")}
                    value={article.title}
                    onChange={this.change.bind(this)} />
                <div className='label'>{tr("content")}</div>
                <input
                    type='text'
                    name='content'
                    placeholder={tr("content")}
                    value={article.content}
                    onChange={this.change.bind(this)} />
                <button
                    type="button"
                    onClick={this.save.bind(this)}>
                    {tr("save")}
                </button>
            </div>
        );
    }
}

export default ViewArticleEdit;  