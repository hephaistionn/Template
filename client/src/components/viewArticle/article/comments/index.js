import './style.scss';
import { Link } from 'react-router-dom';
import React from 'react';
import Reflux from 'reflux';
import Moment from 'moment';
import { StoreComment, actionsComment } from '../../../../stores/comment';
import Textarea from './../../../common/textarea';

class Comments extends Reflux.Component {

    constructor(props) {
        super(props);
        this.state = { comment: '' };
        this.store = StoreComment;
    }

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        const articleId = this.props.articleId;
        actionsComment.get(articleId);
    }

    change(event) {
        const value = event.target.value;
        this.setState({ comment: value });
    }

    send() {
        const comment = this.state.comment;
        const articleId = this.props.articleId;
        actionsComment.send(comment, articleId);
        this.setState({ comment: '' });
    }

    render() {
        const comments = this.state.comments;
        const member = this.props.member;
        const comment = this.state.comment;

        return (
            <div className='comments'>

                <div className='comments__form'>
                    <Textarea
                        className='comments__form__input'
                        type='text'
                        name='content'
                        value={comment}
                        onChange={this.change.bind(this)} />
                    <div
                        className='comments__form__button'
                        onClick={this.send.bind(this)}>
                        {tr('send')}
                    </div>
                </div>

                <div className='comments__list'
                    ref={(c) => this.listview = c}>
                    {comments && comments.list.map((com, index) => <div
                        key={index}
                        className={`comments__list__item ${
                            com.owner === member._id ? 'your' : ''}`} >
                        <div className='comments__list__item__date'>
                            {Moment(com.date).format('MMM/DD HH:mm')}
                        </div>
                        <div className='comments__list__item__content'>
                            {com.content}
                        </div>
                    </div>)}
                </div>
            </div>
        );
    }
}

export default Comments;  