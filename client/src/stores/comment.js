import Reflux from 'reflux';
import axios from 'axios';

export const actionsComment = Reflux.createActions([
    'create',
    'update',
    'remove',
    'get',
    'hideReplies'
]);

export class StoreComment extends Reflux.Store {

    constructor() {
        super();
        this.state = {
            comments: null,
        };
        this.listenables = actionsComment;
    }

    onGet(articleId, commentId) {
        if (!articleId) return;
        if (commentId) {
            axios.get(`/api/comments/article/${articleId}/${commentId}`)
                .then(response => {
                    this.state.comments.list.find(com => com._id === commentId)
                        .replies = response.data;
                    this.setState({ comments: this.state.comments });
                });
        } else {
            axios.get(`/api/comments/article/${articleId}`)
                .then(response => {
                    this.setState({ comments: response.data });
                });
        }
    }

    onCreate(content, articleId, parentId) {
        if (!articleId) return;
        axios.post(`/api/comments/article/${articleId}`, {
            content: content,
            commentId: parentId
        })
            .then(response => {
                const comment = response.data;
                if (parentId) {
                    const com = this.state.comments.list.find(com => com._id === parentId);
                    com.replies ? com.replies.list.push(comment) : com.replies = {list: [comment]};
                    com.numberReplies ? com.numberReplies++ : com.numberReplies = 1;
                    this.setState({ comments: this.state.comments });
                } else {
                    this.state.comments.list.push(comment);
                    this.setState({ comments: this.state.comments });
                }
            });
    }

    onUpdate(content, commentId, parentId) {
        if (!commentId) return;
        axios.put(`/api/comments/${commentId}`, {
            content: content
        })
            .then(response => {
                const commentUpdated = response.data;
                let comment;
                if (parentId) {
                    comment = this.state.comments.list.find(com => com._id === parentId)
                        .replies.list.find(com => com._id === commentUpdated._id);
                } else {
                    comment = this.state.comments.list.find(com => com._id === commentUpdated._id);
                }
                comment.content = commentUpdated.content;
                this.setState({ comments: this.state.comments });
            });
    }

    onRemove(commentId, parentId) {
        if (!commentId) return;
        axios.delete(`/api/comments/${commentId}`)
            .then(() => {
                if(parentId) {
                    const com = this.state.comments.list.find(com => com._id === parentId);
                    const index = com.replies.list.findIndex(com => com._id === commentId);
                    com.replies.list.splice(index, 1);
                    com.numberReplies--;
                    this.setState({ comments: this.state.comments });
                } else {
                    const index = this.state.comments.list.findIndex(com => com._id === commentId);
                    this.state.comments.list.splice(index, 1);
                    this.setState({ comments: this.state.comments });
                }
            });
    }

    onHideReplies(articleId, commentId) {
        if (!articleId) return;
        delete this.state.comments.list.find(com => com._id === commentId)
            .replies;
        this.setState({ comments: this.state.comments });
    }

}