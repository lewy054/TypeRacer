import React from 'react';
import './CSS/WinScreen.css'
export default class WinScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 'block'
        }
    }

    closeWindow = () => {
        this.setState({
            display: 'none'
        })
    }


    render() {
        return (
            <div id="myModal" className="modal" style={{ display: this.state.display }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="close" onClick={this.closeWindow}>&times;</span>
                        <h2>Result</h2>
                    </div>
                    <div className="modal-body">
                        <p>Your score:</p>
                        <p>{this.props.wpm} words per minute</p>
                    </div>
                </div>

            </div>
        )
    }
}