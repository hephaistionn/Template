import Reflux from 'reflux';
import axios from 'axios';
import createHistory from 'history/createBrowserHistory'

export const history = createHistory()

export const actionsMain = Reflux.createActions([
    'redirect',
    'getSession',
    'signup',
    'signin',
    'logout',
    'notif',
]);

export class StoreMain extends Reflux.Store {

    constructor() {
        super();
        this.state = {
            session: {}
        };
        this.listenables = actionsMain;
    }

    onRedirect(path) {
        history.push(path);
    }

    onGetSession() {
        axios.get('/api/members/me')
            .then(response => {
                this.setState({
                    session: response.data
                });
            });
    }

    onSignup(email, password, username, cgu) {
        if (email && username && password && cgu) {
            return axios.post('/api/members/signup', {
                email: email,
                password: password,
                username: username
            }).then((response) => {
                this.setState({ session: response.data });
            });
        }
    }

    onSignin(email, password) {
        axios.post('/api/members/login', {
            email: email,
            password: password
        }).then(response => {
            this.setState({
                session: response.data
            });
            history.push('/');
        });
    }

    onLogout() {
        axios.get('/api/members/logout').then(() => {
        }).then(() => {
            this.setState({
                session: {}
            });
            history.push('/signin');
        });
    }

    onNotif(message, level) {
        console.log(message)
    }

}

axios.interceptors.response.use(response => {
    return response;
}, error => {
    return actionsMain.notif(error, 'error');
});
