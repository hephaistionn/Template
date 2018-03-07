import Reflux from 'reflux';

class ComponentUrlWatched extends Reflux.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

        const params = this.props.match ? this.props.match.params : {};
        this.urlUpdated(params);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.location) {
            return this.urlUpdated();
        }

        const nextPath = nextProps.location.pathname;
        const previousPath = this.props.location.pathname;
        if (previousPath !== nextPath /*&& this.props.match.url === nextPath.slice(0, -1)*/) {
            this.urlUpdated(nextProps.match.params);
        }
    }

    getParam() {
        if (!this.props.location) return;
        return this.props.location.pathname.split('/')[2];
    }

    urlUpdated() {

    }
}

export default ComponentUrlWatched;  
