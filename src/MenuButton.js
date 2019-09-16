import React from 'react';
import './CSS/MenuButton.css'
import StartPage from './Start'
import ReactDOM from 'react-dom';

export default class MenuButton extends React.Component {

    start = () => {
        ReactDOM.render(<StartPage />, document.getElementById('root'));
    }
    render(){
        return(
            <button className="menuButton" onClick={this.start}><span>Menu </span></button>
        )
    }
}

