import './Letter.css';
import React from "react";


class Letter extends React.Component {

    render() {
        return (
            <div className="Letter">{this.props.letter}</div>
        );
    }
}

export default Letter;
