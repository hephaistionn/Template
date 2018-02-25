import Reflux from 'reflux';

class ComponentUrlWatched extends Reflux.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const params = this.props.match.params;
        this.urlUpdated(params);
    }

    componentWillReceiveProps(nextProps) {
        const nextPath = nextProps.location.pathname;
        const previousPath = this.props.location.pathname;
        if (previousPath !== nextPath /*&& this.props.match.url === nextPath.slice(0, -1)*/) {
            this.urlUpdated(nextProps.match.params);
        }
    }

    urlUpdated() {

    }
}

export default ComponentUrlWatched;  
