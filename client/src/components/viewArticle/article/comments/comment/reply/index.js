import './style.scss';
import { Link } from 'react-router-dom';
import React from 'react';
import Moment from 'moment';
import { actionsComment } from '../../../../../../stores/comment';
import Textarea from './../../../../../common/textarea';
import Avatar from './../../../../../common/avatar';

class Reply extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: '', edit: false };
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
        const parentId = this.props.commentId;
        const commentId = this.props.comment._id;
        const value = this.state.value;
        actionsComment.update(value, commentId, parentId);
        this.setState({ value: '', edit: false });
    }

    cancel() {
        this.setState({
            value: '',
            edit: false,
            reply: false
        });
    }

    remove() {
        const parentId = this.props.commentId;
        const commentId = this.props.comment._id;
        actionsComment.remove(commentId, parentId);
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
        const className = (this.props.className || '') + (your ? ' your' : '');

        return (
            <div className={`comment reply ${className}`} >
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
                    edit && <div className='comment__content__from'>
                        <textarea className='comment__form__textarea'
                            value={this.state.value}
                            onChange={this.onChange.bind(this)} />
                        <div className='comment__form__ok'
                            onClick={this.sendUpdate.bind(this)}>{tr('send')}</div>
                        <div className='comment__form__cancel'
                            onClick={this.cancel.bind(this)}>{tr('cancel')}</div>
                    </div>
                }
            </div>
        );
    }
}

export default Reply;  