import React from 'react';
import './CSS/Start.css'
import Main from './App'
import ReactDOM from 'react-dom';
export default class StartPage extends React.Component {

    start = () => {
        ReactDOM.render(<Main />, document.getElementById('root'));
    }
    render() {
        return (
            <div>
                <div className="col1">
                    <p style={{
                        color: 'white',
                        fontSize: '200%'
                    }}>Test your typing skills</p>
                </div>
                <div >
                    <button className='start' onClick={this.start}>Start</button>
                </div>
            </div>
        )
    }
}