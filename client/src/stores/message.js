import Reflux from 'reflux';
import axios from 'axios';
import { actionsMain } from './main';

export const actionsMessage = Reflux.createActions([
    'send',
    'change',
    'get'
]);

export class StoreMessage extends Reflux.Store {

    constructor() {
        super();
        this.state = {
            messages: [],
            conversations: [],
        };
        this.listenables = actionsMessage;
    }

    onGet(memberId) {
        this.setState({ messages: [] });
        if (!memberId) {
            axios.get(`/api/messages`)
                .then(response => {
                    this.setState({ conversations: response.data });
                });
        } else {
            axios.get(`/api/messages/team/${memberId}`)
                .then(response => {
                    this.setState({ messages: response.data });
                });
        }
    }

    onSend(content, memberId) {
        if (!memberId) return;
        axios.post(`/api/messages/team/${memberId}`, {
            content: content
        })
            .then(response => {
                this.state.messages.push(response.data)
                this.setState({ messages: this.state.messages });
            });
    }

}