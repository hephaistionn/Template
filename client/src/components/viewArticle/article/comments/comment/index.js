import './style.scss';
import { Link } from 'react-router-dom';
import React from 'react';
import Moment from 'moment';
import { actionsComment } from '../../../../../stores/comment';
import Textarea from './../../../../common/textarea';
import Avatar from './../../../../common/avatar';
import Reply from './reply';

class Comment extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: '', edit: false, reply: false };
    }

    edit() {
        const content = this.props.comment.content;
        this.setState({
            value: content,
            edit: true
        });
    }

    reply() {
        this.setState({
            value: '',
            reply: true
        });
    }

    sendUpdate() {
        const commentId = this.props.comment._id;
        const value = this.state.value;
        actionsComment.update(value, commentId);
        this.setState({ value: '', edit: false });
    }

    sendReply() {
        const commentId = this.props.comment._id;
        const articleId = this.props.articleId;
        const value = this.state.value;
        actionsComment.create(value, articleId, commentId);
        this.setState({ value: '', reply: false });
    }

    cancel() {
        this.setState({
            value: '',
            edit: false,
            reply: false
        });
    }

    showReplies() {
        const commentId = this.props.comment._id;
        const articleId = this.props.articleId;
        actionsComment.get(articleId, commentId);
    }

    hideReplies() {
        const commentId = this.props.comment._id;
        const articleId = this.props.articleId;
        actionsComment.hideReplies(articleId, commentId);
    }

    remove() {
        const commentId = this.props.comment._id;
        actionsComment.remove(commentId);
    }

    onChange(event) {
        const value = event.target.value;
        this.setState({ value: value });
    }

    render() {
        const member = this.props.member;
        const comment = this.props.comment;
        const owner = this.props.comment.owner;
        const your = comment.owner._id === member._id;
        const edit = this.state.edit;
        const reply = this.state.reply;
        const className = (this.props.className || '') + (your ? ' your' : '');

        return (
            <div className={`comment ${className}`} >
                <div className='comment__actions'>
                    {your &&
                        <div className='comment__actions__edit' onClick={this.edit.bind(this)} />}
                    {your &&
                        <div className='comment__actions__remove' onClick={this.remove.bind(this)} />}
                </div>
                <Avatar className='comment__avatar' member={owner} />
                <div className='comment__info'>
                    <Link className='comment__info__username' to={`/members/${owner._id}`}>
                        {owner.username}
                    </Link>
                    <div className='comment__info__date'>
                        {Moment(comment.date).format('MMM/DD HH:mm')}
                    </div>
                </div>
                {
                    !edit && <div className='comment__content'>{comment.content}</div>
                }
                {
                    (edit || reply) && <div className='comment__content__from'>
                        <textarea className='comment__form__textarea'
                            value={this.state.value}
                            onChange={this.onChange.bind(this)} />
                        {edit && <div className='comment__form__ok'
                            onClick={this.sendUpdate.bind(this)}>{tr('send')}</div>}
                        {reply && <div className='comment__form__ok'
                            onClick={this.sendReply.bind(this)}>{tr('send')}</div>}
                        <div className='comment__form__cancel'
                            onClick={this.cancel.bind(this)}>{tr('cancel')}</div>
                    </div>
                }

                {(!edit && !reply) &&
                    <div className='comment__reply' onClick={this.reply.bind(this)} >
                        {tr('reply')}
                    </div>}

                {(comment.numberReplies > 0 && !comment.replies) &&
                    <div className='comment__nb_replies' onClick={this.showReplies.bind(this)} >
                        {tr('show the ')} {comment.numberReplies} {comment.numberReplies > 1 ? tr('replies') : tr('reply')}
                    </div>}

                {comment.replies &&
                    <div className='comment__hide_replies' onClick={this.hideReplies.bind(this)} >
                        {tr('hide the ')} {comment.numberReplies} {comment.numberReplies > 1 ? tr('replies') : tr('reply')}
                    </div>}

                {comment.replies && comment.replies.list.map((reply, index) => <Reply
                    member={member}
                    comment={reply}
                    articleId={this.props.articleId}
                    commentId={comment._id}
                    key={index} />)}
            </div>
        );
    }
}

export default Comment;  