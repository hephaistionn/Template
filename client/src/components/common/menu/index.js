import './style.scss';
import React from 'react';
import { Route, Link } from 'react-router-dom';

class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = { open: false }
        this.close = () => {
            this.onClose();
        };
    }

    onOpen() {
        this.setState({ open: true });
        document.addEventListener('click', this.close);
    }

    onClose() {
        this.setState({ open: false });
        document.removeEventListener('click', this.close);
    }

    callAction(item) {
        item.actionFn();
    }

    render() {
        return (
            <div className={`menu ${this.props.className || ''}`}>
                <div className='menu__button'
                    aria-hidden='true'
                    onClick={this.onOpen.bind(this)} />
                {this.state.open && <div className='menu__list'>
                    {this.props.list.map((item, index) => {
                        if (item.actionFn) {
                            return <div key={index} onClick={this.callAction.bind(this, item)} className='menu__list__item'>
                                {item.classIcon && <i className={item.classIcon} aria-hidden="true"></i>}
                                {item.label}
                            </div>
                        } else if (item.link) {
                            return <Link key={index} to={item.link} className='menu__list__item'>
                                {item.classIcon && <i className={item.classIcon} aria-hidden="true"></i>}
                                {item.label}
                            </Link>
                        }
                    }
                    )}
                </div>}
            </div>
        )
    }
}

export default Menu;