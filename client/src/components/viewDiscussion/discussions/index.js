import './style.scss';
import React from 'react';
import Moment from 'moment';
import CardDiscussion from './cardDiscussion';

class Discussions extends React.Component {
    render() {
        const conversations = this.props.conversations;
        return (
            <div className={`discussions ${this.props.className||''}`}>
                <div className='discussions__grid'>
                    {conversations.map((conversation, index) => <CardDiscussion
                        className='discussions__grid__item'
                        conversation={conversation} key={index} />)}
                </div>
            </div>
        );
    }
}

export default Discussions;  