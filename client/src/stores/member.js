import Reflux from 'reflux';

//Action
export const actionsMember = Reflux.createActions([
    'register',
    'login',
    'logout',
    'update',
    'loadMember',
    'loadCurrentMember',
    'setPicture'
]);
//Store
export class StoreMember extends Reflux.Store {

    constructor() {
        super();
        this.state = {
            member: {},
            currentMember: {}
        };
        this.listenables = actionsMember;
    }

    onRegister(email, password, username, cgu) {

        if (email && username && password && cgu) {
            return request.post('/api/Members/', {
                email: email,
                password: password,
                username: username
            }).then((response) => {
                console.log(response);
                this.setState({});
            });
        }
    }

    onLogin(email, password, redirectPath) {
        request.post('/api/Members/login', {
            email: email,
            password: password
        }).then(response => {
            console.log(response);
            this.setState({});
        }).then(() => {
            actionsMain.redirect(redirectPath);
        })
    }

    onLogout(redirectPath) {
        request.post('/api/Members/logout').then(() => {
        }).then(() => {
            actionsMain.redirect(redirectPath);
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