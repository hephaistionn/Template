import Reflux from 'reflux';
import request from '../tools/request';

//Action
export const actionsArticle = Reflux.createActions([
    'getAll',
    'get',
    'update'
]);
//Store
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
                console.log(response.data);
            })
            .catch(function (err) {
                console.log(err);
            }); 
    }
}