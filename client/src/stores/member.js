import Reflux from 'reflux';
import request from '../tools/request';

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
            return request.post('/api/members/signup', {
                email: email,
                password: password,
                username: username
            }).then((response) => {
                this.setState({ member: response.data });
            });
        }
    }

    onSignin(email, password) {
        request.post('/api/members/login', {
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
        request.get('/api/members/logout').then(() => {
        }).then(() => {
            location.pathname = '/signin';
        });
    }

    onGetCurrentMember() {
        request.get('/api/members/me')
            .then(response => {
                this.setState({
                    currentMember: response.data
                });
            });
    }

    onGet(memberId) {
        request.get('/api/members/' + (memberId || ''))
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
        request.put('/api/members/' + memberId, {
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
            return request.post('/api/documents/upload/', file[0])
        }

        function store(response) {
            console.log(response);;
        }

        function save(member) {
            console.log(member);
        }
    }
}