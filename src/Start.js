import React from 'react';
import './CSS/Start.css'
import Main from './App'
import ReactDOM from 'react-dom';
export default class StartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'English'
        };
    }

    start = () => {
        ReactDOM.render(<Main language={this.state.language} />, document.getElementById('root'));
    }

    changeLanguage = (event) => {
        this.setState({
            language: event.target.value
        })
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
                <div className="language">
                    <h2>Select the language of the texts</h2>
                    <form >
                        <select className="select-css" value={this.state.language} onChange={this.changeLanguage}>
                            <option value="English">English</option>
                            <option value="Polish">Polish</option>
                        </select>
                    </form>
                </div>
            </div>
        )
    }
}