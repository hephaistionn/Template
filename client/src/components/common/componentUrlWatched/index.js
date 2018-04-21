import Reflux from 'reflux';

class ComponentUrlWatched extends Reflux.Component {

    constructor(props) {
        super(props);
        this.scrollY = 0;
        this.scollDown = false;
    }

    componentDidMount() {
        const params = this.props.match ? this.props.match.params : {};
        this.onUrlChange(params);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.location) {
            this.onUrlChange();
        }

        const nextPath = nextProps.location.pathname;
        const previousPath = this.props.location.pathname;
        if (previousPath !== nextPath /*&& this.props.match.url === nextPath.slice(0, -1)*/) {
            this.onUrlChange(nextProps.match.params);
        }
    }

    getParam() {
        if (!this.props.location) return;
        return this.props.location.pathname.split('/')[2];
    }

    onScoll(event) {
        const y = event.currentTarget.parentElement.getClientRects()[0].top;
        if (this.scollDown && y === this.scrollY) {
            this.onScrollBottom();
        }
        this.scollDown = y < this.scrollY;
        this.scrollY = y;
    }

    onScrollBottom() {

    }

    onUrlChange() {

    }
}

export default ComponentUrlWatched;  
