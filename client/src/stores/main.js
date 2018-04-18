import Reflux from 'reflux';
import axios from 'axios';
import createHistory from 'history/createBrowserHistory'
import { actionsArticle } from './article';

export const history = createHistory()

export const actionsMain = Reflux.createActions([
    'redirect',
    'getSession',
    'autoloc',
    'signup',
    'signin',
    'logout',
    'verify',
    'getVerifyToken',
    'reset',
    'getResetToken',
    'notif',
]);

export class StoreMain extends Reflux.Store {

    constructor() {
        super();
        this.state = {
            session: {},
            loc: null,
            city: null
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
                if(location.pathname === '/')
                    history.push('/members');
            });
    }

    onAutoloc() {
        axios.get('https://geoip-db.com/json/')
            .then(response => {
                const city = response.data.city + ', '+ response.data.country_name;
                const loc = [response.data.latitude, response.data.longitude];
                this.setState({ city: city, loc: loc });
            });
    }

    onSignup(email, password, username, cgu, city, loc) {
        if (email && username && password && cgu) {
            return axios.post('/api/members/signup', {
                email: email,
                password: password,
                username: username,
                city: city,
                loc: loc
            }).then((response) => {
                actionsMain.redirect('/verify/');
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
            history.push('/articles');
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

    onVerify(token) {
        axios.post('/api/members/verify', {
            token: token
        }).then((response) => {
            this.setState({ session: response.data });
            actionsMain.redirect('/members');
        }); 
    }

    onGetVerifyToken(email) {
        axios.post('/api/members/verifyrequest', {
            email: email
        }).then((response) => {
            actionsMain.notif(tr('mail sent'));
            actionsMain.redirect('/verify/confirm');
        }); 
    }

    onReset(token, password) {
        axios.post('/api/members/reset', {
            token: token,
            password: password
        }).then((response) => {
            actionsMain.notif(tr('password changed'));
            actionsMain.redirect('/signin');
        }); 
    }

    onGetResetToken(email) {
        axios.post('/api/members/resetrequest', {
            email: email
        }).then((response) => {
            actionsMain.notif(tr('mail sent'));
            actionsMain.redirect('/reset/confirm');
        }); 
    }

    onNotif(message, level) {
        //console.log(message)
    }

}

axios.interceptors.response.use(response => {
    return response;
}, error => {
    if(error.request.status ===  428){
        actionsMain.redirect('/verify');
    }else if(error.request.status ===  511){
        // actionsMain.redirect('/signin');
    }else{
        actionsMain.notif(error, 'error');
    }
    throw error;
});
