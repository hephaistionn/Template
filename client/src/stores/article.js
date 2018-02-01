import Reflux from 'reflux';
import request from '../tools/request';

export const actionsArticle = Reflux.createActions([
    'getAll',
    'get',
    'update'
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

    getAll() {
        request.get('/api/articles/')
            .then((response) => {
                this.setState({articles: response.data});
            })
            .catch(function (err) {
                console.log(err);
            }); 
    }

    get(articleId) {
        request.get('/api/articles/'+articleId)
            .then((response) => {
                this.setState({article: response.data});
            })
            .catch(function (err) {
                console.log(err);
            }); 
    }
}