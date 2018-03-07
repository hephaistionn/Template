import Reflux from 'reflux';
import axios from 'axios';

export const actionsComment = Reflux.createActions([
    'send',
    'get'
]);

export class StoreComment extends Reflux.Store {

    constructor() {
        super();
        this.state = {
            comments: null,
        };
        this.listenables = actionsComment;
    }

    onGet(articleId) {
        if (articleId) {
            axios.get(`/api/comments/article/${articleId}`)
                .then(response => {
                    this.setState({ comments: response.data });
                });
        }
    }

    onSend(content, articleId) {
        if (!articleId) return;
        axios.post(`/api/comments/article/${articleId}`, {
            content: content
        })
            .then(response => {
                const comment = response.data;
                this.state.comments.list.push(comment);
                this.setState({ comments: this.state.comments });
            });
    }

}