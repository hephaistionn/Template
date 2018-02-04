import Reflux from 'reflux';
import axios from 'axios';

export const actionsMember = Reflux.createActions([
    'signup',
    'signin',
    'logout',
    'change',
    'update',
    'get',
    'getCurrentMember',
    'setPicture'
]);

export class StoreMember extends Reflux.Store {

    constructor() {
        super();
        this.state = {
            members: [],
            member: {},
            currentMember: {}
        };
        this.listenables = actionsMember;
    }

    onSignup(email, password, username, cgu) {
        if (email && username && password && cgu) {
            return axios.post('/api/members/signup', {
                email: email,
                password: password,
                username: username
            }).then((response) => {
                this.setState({ member: response.data });
            });
        }
    }

    onSignin(email, password) {
        axios.post('/api/members/login', {
            email: email,
            password: password
        }).then(response => {
            this.setState({
                member: response.data
            });
            location.pathname = '/';
        });
    }

    onLogout() {
        axios.get('/api/members/logout').then(() => {
        }).then(() => {
            location.pathname = '/signin';
        });
    }

    onGetCurrentMember() {
        axios.get('/api/members/me')
            .then(response => {
                this.setState({
                    currentMember: response.data
                });
            });
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

    onUpdate(memberId, username) {
        axios.put('/api/members/' + memberId, {
            username: username
        })
            .then((response) => {
                this.setState({ member: response.data });
                location.pathname = '/members/' + memberId;
            });
    }

    onSetPicture(file) {
        return upload(file).then(store.bind(this)).then(save);

        function upload(file) {
            return axios.post('/api/documents/upload/', file[0])
        }

        function store(response) {
            console.log(response);;
        }

        function save(member) {
            console.log(member);
        }
    }
}