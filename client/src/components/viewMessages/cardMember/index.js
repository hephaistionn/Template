import './style.scss';
import React from 'react';
import { Link } from 'react-router-dom';

class CardMember extends React.Component {

    constructor(props) {
        super(props);
        const colors = ['#ff7606','#FF0000','#00FF00','#0000FF','#FFFF00','#00FFFF','#FF00FF','#94ff6f'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    render() {
        const member = this.props.member;
        const style =  {
            backgroundColor: this.color,
            backgroundImage: member.avatar ? `url(${member.avatar})`: null
        };


        return (

            <Link className={`card-member ${this.props.className || ''}`}
                style={style}
                to={`/members/${member._id}`}>
                <span className="card-member__username">{member.username}</span>
            </Link>
        )
    }
}

export default CardMember;