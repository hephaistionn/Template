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
            member: {},
            optionsExperience: [
                { value: 0, label: '0 ' + tr('year') },
                { value: 1, label: '1 ' + tr('year') },
                { value: 2, label: '2 ' + tr('years') },
                { value: 3, label: '3 ' + tr('years') }
            ]
        };
        this.listenables = actionsMember;
    }

    onGet(memberId) {
        axios.get('/api/members/' + (memberId || ''))
            .then(response => {
                this.setState(memberId ?
                    { member: response.data } :
                    { members: response.data.concat(response.data) }
                );
            });
    }

    onChange(field, value) {
        this.state.member[field] = value
        this.setState({ member: this.state.member });
    }

    onUpdate(memberId, username, avatar, description, experience, working, skills) {
        axios.put('/api/members/' + memberId, {
            username: username,
            avatar: avatar,
            description: description,
            experience: experience,
            working: working,
            skills: skills
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