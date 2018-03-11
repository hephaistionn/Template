import Reflux from 'reflux';
import axios from 'axios';

export const actionsComment = Reflux.createActions([
    'send',
    'update',
    'remove',
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

    onUpdate(content, commentId) {
        if (!commentId) return;
        axios.put(`/api/comments/${commentId}`, {
            content: content
        })
            .then(response => {
                const commentUpdated = response.data;
                const comment = this.state.comments.list.find(com => com._id === commentUpdated._id);
                comment.content = commentUpdated.content;
                this.setState({ comments: this.state.comments });
            });
    }

    onRemove(commentId) {
        if (!commentId) return;
        axios.delete(`/api/comments/${commentId}`)
            .then(response => {
                const index = this.state.comments.list.findIndex(com => com._id === commentId);
                this.state.comments.list.splice(index, 1);
                this.setState({ comments: this.state.comments });
            });
    }

}