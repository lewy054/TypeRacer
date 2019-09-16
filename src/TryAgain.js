import React from 'react';
import './CSS/TryAgain.css'

export default class TryAgain extends React.Component {

    start = () => {
        this.props.resetApp();
    }
    render(){
        return(
            <button className="tryAgain" onClick={this.start}><span>Restart </span></button>
        )
    }
}

