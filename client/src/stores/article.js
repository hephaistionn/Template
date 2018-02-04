import Reflux from 'reflux';
import request from '../tools/request';

export const actionsArticle = Reflux.createActions([
    'get',
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
        request.get('/api/articles/' + (articleId || ''))
            .then((response) => {
                articleId ?
                    this.setState({ article: response.data }) :
                    this.setState({ articles: response.data });
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    onChange(field, value) {
        this.state.article[field] = value
        this.setState({ article: this.state.article });
    }

    onUpdate(articleId, title, content) {
        request.put('/api/articles/' + articleId, {
            title: title,
            content: content
        })
            .then((response) => {
                this.setState({ article: response.data });
                location.pathname = '/articles/' + articleId;
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    onCreate(title, content) {
        request.post('/api/articles/', {
            title: title,
            content: content
        })
            .then((response) => {
                this.setState({ article: response.data });
                location.pathname = '/articles/' + response.data._id;
            })
            .catch(function (err) {
                console.log(err);
            });
    }
}