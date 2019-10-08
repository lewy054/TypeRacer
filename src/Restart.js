import React from 'react';
import './CSS/Restart.css'

export default class Restart extends React.Component {

    start = () => {
        this.props.resetApp();
    }
    render(){
        return(
            <button className="restart" onClick={this.start}><span>Next </span></button>
        )
    }
}

