import Reflux from 'reflux';
import axios from 'axios';
import { actionsMain } from './main';

export const actionsMember = Reflux.createActions([
    'change',
    'update',
    'get',
    'setPicture'
]);

export class StoreMember extends Reflux.Store {

    constructor() {
        super();
        this.state = {
            members: [],
            member: {}
        };
        this.listenables = actionsMember;
    }

    onGet(memberId) {
        axios.get('/api/members/' + (memberId || ''))
            .then(response => {
                this.setState(memberId ?
                    { member: response.data } :
                    { members: response.data }
                );
            });
    }

    onChange(field, value) {
        this.state.member[field] = value
        this.setState({ member: this.state.member });
    }

    onUpdate(memberId, username, avatar) {
        axios.put('/api/members/' + memberId, {
            username: username,
            avatar: avatar
        })
            .then((response) => {
                this.setState({ member: response.data });
                actionsMain.redirect('/members/' + memberId);
            });
    }

    onSetPicture(file) {
        return upload(file).then(store.bind(this));

        function upload(file) {
            const form = new FormData();
            const name = Math.floor((1 + Math.random()) * 0x100000000000000).toString(16).substring(1);
            const extension = file.name.split('.').pop();
            form.append('image', file, name + '.' + extension);
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            };
            return axios.post('/api/documents/upload/', form, config)
        }

        function store(response) {
            const member = this.state.member;
            member.avatar = response.data;
            this.setState({ 'member': member });
            return member;
        }
    }
}