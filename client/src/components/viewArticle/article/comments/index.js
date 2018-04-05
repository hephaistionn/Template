import './style.scss';
import { Link } from 'react-router-dom';
import React from 'react';
import Reflux from 'reflux';
import Moment from 'moment';
import { StoreComment, actionsComment } from '../../../../stores/comment';
import Textarea from './../../../common/textarea';
import Comment from './comment'

class Comments extends Reflux.Component {

    constructor(props) {
        super(props);
        this.state = { value: ''};
        this.store = StoreComment;
    }

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        const articleId = this.props.articleId;
        actionsComment.get(articleId);
    }

    changeComment(event) {
        const value = event.target.value;
        this.setState({ value: value });
    }

    sendComment() {
        const value = this.state.value;
        const articleId = this.props.articleId;
        actionsComment.create(value, articleId);
        this.setState({ value: '' });
    }

    render() {
        const comments = this.state.comments;
        const member = this.props.member;
        const value = this.state.value;

        return (
            <div className='comments'>

                <div className='comments__form'>
                    <Textarea
                        className='comments__form__input'
                        type='text'
                        name='content'
                        value={value}
                        onChange={this.changeComment.bind(this)} />
                    <div
                        className='comments__form__button'
                        onClick={this.sendComment.bind(this)}>
                        {tr('send')}
                    </div>
                </div>

                <div className='comments__list'
                    ref={(c) => this.listview = c}>
                    {comments && comments.list.map((com, index) => <Comment
                        member={member}
                        comment={com}
                        articleId={this.props.articleId}
                        key={index} />)}
                </div>
            </div>
        );
    }
}

export default Comments;  