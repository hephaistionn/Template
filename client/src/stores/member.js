import Reflux from 'reflux';
import request from '../tools/request';

export const actionsMember = Reflux.createActions([
    'signup',
    'signin',
    'logout',
    'update',
    'loadMember',
    'loadCurrentMember',
    'setPicture'
]);

export class StoreMember extends Reflux.Store {

    constructor() {
        super();
        this.state = {
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
                this.setState({member:response.data});
            });
        }
    }

    onSignin(email, password, redirectPath) {
        request.post('/api/members/login', {
            email: email,
            password: password
        }).then(response => {
            this.setState({
                member:response.data
            });
            location.pathname = redirectPath;
        })
    }

    onLogout(redirectPath) {
        request.get('/api/members/logout').then(() => {
        }).then(() => {
            location.pathname = redirectPath;
        })
    }

    onLoadCurrentMember() {

    }

    onLoadMember(memberId) {
        console.log(memberId);
    }

    onUpdate() {

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