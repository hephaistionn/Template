import Reflux from 'reflux';
import axios from 'axios';

import { actionsMain } from './main';

export const actionsArticle = Reflux.createActions([
    'get',
    'getList',
    'clear',
    'change',
    'update',
    'create'
]);

export class StoreArticle extends Reflux.Store {

    constructor() {
        super();
        this.state = {
            article: {},
            articles: []
        };
        this.listenables = actionsArticle;
    }

    onGet(articleId) {
        this.setState({ article: {} });
        axios.get('/api/articles/' + articleId)
            .then((response) => {
                this.setState({ article: response.data });
            });
    }

    onGetList(page) {
        this.setState({ article: {} });
        axios.get('/api/articles/?page=' + page)
            .then((response) => {
                if(page===1) {
                    this.setState({ articles: response.data })
                }else{
                    response.data.docs = [].concat(this.state.articles.docs).concat(response.data.docs);
                    this.setState({ articles: response.data })
                }
            });
    }

    onClear() {
        this.setState({ article: {} });
    }

    onChange(field, value) {
        this.state.article[field] = value
        this.setState({ article: this.state.article });
    }

    onUpdate(articleId, title, content) {
        axios.put('/api/articles/' + articleId, {
            title: title,
            content: content
        })
            .then((response) => {
                this.setState({ article: response.data });
                actionsMain.redirect('/articles/' + articleId)
            });
    }

    onCreate(title, content) {
        axios.post('/api/articles/', {
            title: title,
            content: content
        })
            .then((response) => {
                this.setState({ article: response.data });
                actionsMain.redirect('/articles/' + response.data._id)
            });
    }
}

