import Reflux from 'reflux';

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
        console.log('getAll');
        fetch('/api/articles/').then((resp) => resp.json())
            .then((response) => {
                console.log(response);
            })
            .catch(function (err) {
                console.log(err);
            }); 
    }
}