import Reflux from 'reflux';
import axios from 'axios';
import { actionsMain } from './main';
import io from 'socket.io-client'

export const actionsMessage = Reflux.createActions([
    'send',
    'get',
    'updated' //Hack, very bad
]);

export class StoreMessage extends Reflux.Store {

    constructor() {
        super();
        this.state = {
            messages: null,
            conversations: [],
        };
        this.listenables = actionsMessage;
    }

    onGet(memberId) {
        if (!memberId) {
            this.setState({ messages: null });
            axios.get(`/api/messages`)
                .then(response => {
                    this.setState({ conversations: response.data.concat(response.data) });
                    // auto select conversation if no selected conversation. Only for large screen 
                    const lastMessage  = this.state.conversations[0];
                    const largeScreen = window.innerWidth>768;
                    const memberId = location.pathname.split('/')[2];
                    if(lastMessage && largeScreen && !memberId) {
                        actionsMain.redirect(`/messages/${lastMessage.member._id}`);
                    }
                });
        } else {
            axios.get(`/api/messages/team/${memberId}`) 
                .then(response => {
                    this.setState({ messages: response.data });
                    actionsMessage.updated();
                    if(this.socket) this.socket.disconnect();
                    const room =  response.data.room;
                    this.socket = io.connect('', {query : `room=${room}`});
                    this.socket.on('receives', (message)  => {
                        this.state.messages.list.push(message)
                        this.setState({ messages: this.state.messages });
                        actionsMessage.updated();
                    });
                });
        }
    }

    onSend(content, memberId) {
        if (!memberId) return;
        axios.post(`/api/messages/team/${memberId}`, {
            content: content
        })
            .then(response => {
                const message = response.data;
                this.state.messages.list.push(message);
                this.setState({ messages: this.state.messages });
                actionsMessage.updated();
                this.socket.emit('send', message);
            });
    }

}