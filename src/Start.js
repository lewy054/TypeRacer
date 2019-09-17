import React from 'react';
import './CSS/Start.css'
import Main from './App'
import ReactDOM from 'react-dom';
export default class StartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'English',
            random:false,
            display:''
        };
    }

    start = () => {
        ReactDOM.render(<Main language={this.state.language} random={this.state.random} />, document.getElementById('root'));
    }

    changeLanguage = (event) => {
        this.setState({
            language: event.target.value
        })
    }

    handleChange=(event)=>{
        console.log(event.target.checked)
        if(this.state.random){
            this.setState({
                display:'block'
            })
        }
        else{
            this.setState({
                display:'none'
            })
        }
        this.setState({
            random: !this.state.random,
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
                <div style={{top:'50%'}}>
                    <button className='start' onClick={this.start}>Start</button>
                    <label className="container">Random letters
                    <input type="checkbox" checked={this.state.random}  onChange={this.handleChange} />
                        <span className="checkmark" ></span>
                    </label>
                </div>
                <div className="language" style={{display:this.state.display}}>
                    <h2>Select the language of the texts</h2>
                    <form >
                        <select className="select-css" value={this.state.language} disabled={this.state.random}  onChange={this.changeLanguage}>
                            <option value="English">English</option>
                            <option value="Polish">Polish</option>
                        </select>
                    </form>
                </div>
            </div>
        )
    }
}