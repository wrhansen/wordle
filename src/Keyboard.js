import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import './Keyboard.css'

class LetterKey extends React.Component {
    render() {
        return (
            <button className="KeyboardKey" onClick={(e) => this.props.handleClick(e, this.props.Key)}>
                {this.props.Key}
            </button>
        );
    }
}

class EnterKey extends React.Component {
    render() {
        return (
            <button className="KeyboardKey" onClick={(e) => this.props.handleClick(e, "ENTER")}>
                Enter
            </button>
        );
    }
}

class DeleteKey extends React.Component {
    render() {
        return (
            <button className="KeyboardKey" onClick={(e) => this.props.handleClick(e, "DELETE")}>
                <FontAwesomeIcon icon={solid("delete-left")} />
            </button>
        );
    }
}

class Keyboard extends React.Component {
    render() {
        return (
            <div className="Keyboard">
                <div className="KeyboardContainer container">
                    <div className="KeyboardRow row">
                        <LetterKey Key="Q" handleClick={this.props.handleKeyPress} />
                        <LetterKey Key="W" handleClick={this.props.handleKeyPress} />
                        <LetterKey Key="E" handleClick={this.props.handleKeyPress} />
                        <LetterKey Key="R" handleClick={this.props.handleKeyPress} />
                        <LetterKey Key="T" handleClick={this.props.handleKeyPress} />
                        <LetterKey Key="Y" handleClick={this.props.handleKeyPress} />
                        <LetterKey Key="U" handleClick={this.props.handleKeyPress} />
                        <LetterKey Key="I" handleClick={this.props.handleKeyPress} />
                        <LetterKey Key="O" handleClick={this.props.handleKeyPress} />
                        <LetterKey Key="P" handleClick={this.props.handleKeyPress} />
                    </div>
                    <div className="KeyboardRow row">
                        <LetterKey Key="A" handleClick={this.props.handleKeyPress} />
                        <LetterKey Key="S" handleClick={this.props.handleKeyPress} />
                        <LetterKey Key="D" handleClick={this.props.handleKeyPress} />
                        <LetterKey Key="F" handleClick={this.props.handleKeyPress} />
                        <LetterKey Key="G" handleClick={this.props.handleKeyPress} />
                        <LetterKey Key="H" handleClick={this.props.handleKeyPress} />
                        <LetterKey Key="J" handleClick={this.props.handleKeyPress} />
                        <LetterKey Key="K" handleClick={this.props.handleKeyPress} />
                        <LetterKey Key="L" handleClick={this.props.handleKeyPress} />
                    </div>
                    <div className="KeyboardRow row">
                        <EnterKey handleClick={this.props.handleKeyPress} />
                        <LetterKey Key="Z" handleClick={this.props.handleKeyPress} />
                        <LetterKey Key="X" handleClick={this.props.handleKeyPress} />
                        <LetterKey Key="C" handleClick={this.props.handleKeyPress} />
                        <LetterKey Key="V" handleClick={this.props.handleKeyPress} />
                        <LetterKey Key="B" handleClick={this.props.handleKeyPress} />
                        <LetterKey Key="N" handleClick={this.props.handleKeyPress} />
                        <LetterKey Key="M" handleClick={this.props.handleKeyPress} />
                        <DeleteKey handleClick={this.props.handleKeyPress} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Keyboard;
