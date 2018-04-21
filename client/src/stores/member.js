import Reflux from 'reflux';
import axios from 'axios';
import { actionsMain } from './main';

export const actionsMember = Reflux.createActions([
    'change',
    'update',
    'get',
    'getList',
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
            ],
            optionsDistance: [
                { value: 5, label: '5 ' + tr('km') },
                { value: 10, label: '10 ' + tr('km') },
                { value: 50, label: '50' + tr('km') },
                { value: 200, label: '200 ' + tr('km') },
                { value: 300, label: '300 ' + tr('km') },
                { value: 400, label: '400 ' + tr('km') },
                { value: 1000, label: '1000' + tr('km') }
            ]
        };
        this.listenables = actionsMember;
    }

    onGet(memberId) {
        axios.get('/api/members/' + memberId)
            .then(response => {
                this.setState({ member: response.data });
            });
    }

    onGetList(params, page) {
        axios.get('/api/members/?page=' + (page || 1), { params: params })
            .then(response => {
                if (page === 1) {
                    this.setState({ members: response.data });
                } else if(this.state.members.docs) {
                    response.data.docs = [].concat(this.state.members.docs).concat(response.data.docs);
                    this.setState({ members: response.data })
                }
            });
    }

    onChange(field, value) {
        this.state.member[field] = value
        this.setState({ member: this.state.member });
    }

    onUpdate(memberId, fileds) {
        axios.put('/api/members/' + memberId, fileds)
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