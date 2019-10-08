import React from 'react';
import ProgressBar from './ProgressBar';
//import TopList from './TopList';
import WinScreen from './WinScreen';
import Restart from './Restart'
import MenuButton from './MenuButton'
import './CSS/App.css'
import { english } from './content/english.json';
import { polish } from './content/polish.json';


let text;
let source;
let arrText;
let textToShow;
let words;
let completedText;
let completedWords;
let oneWordProgress;
let howManyChar;
const noCopy = {
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  userSelect: 'none',

}
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      disabled: true,
      timeToStart: 5,
      writingTime: 0,
      wpm: 0,
      progress: 0,
      winScreen: false,
      lowestWPM: '',
      color: '',
      howManyChar: 0
    }

  }


  componentDidMount() {
    this.start()
  }

  start = (sameText = false) => {

    this.restartData(sameText)
    if (!sameText) {
      this.getText()
    }
    else{
      this.getTextReady()
    }
    this.intervalTimeToStart = setInterval(() => {
      if (this.state.timeToStart > 1) {
        this.setState(prevState => ({
          timeToStart: prevState.timeToStart - 1
        }));
        if (this.state.timeToStart > 3) {
          this.setState({
            color: 'red'
          })
        }
        else if (this.state.timeToStart > 1) {
          this.setState({
            color: 'orange'
          })
        }
        else {
          this.setState({
            color: 'green'
          })
        }
      }
      else {
        this.setState({
          disabled: false,
          timeToStart: 0
        })
        this.nameInput.focus();
        this.writingTime();
        clearInterval(this.intervalTimeToStart)
      }
    }, 1000);
  }

  tryAgain = () => {
    this.start(true)
  }

  restartData = (sameText = false) => {
    //reset everything
    clearInterval(this.intervalTimeToStart)
    clearInterval(this.intervalWritingTime)
    if (!sameText) {
      text = "";
      source = "";
    }
    arrText = [];
    textToShow = [];
    words = 0;
    howManyChar = 0;
    completedText = [];
    completedWords = [];
    oneWordProgress = [];
    this.setState({
      inputValue: '',
      disabled: true,
      timeToStart: 5,
      writingTime: 0,
      howManyChar: 0,
      wpm: 0,
      progress: 0,
      winScreen: false,
      lowestWPM: '',
      color: 'red'
    })
  }

  readFromFile = () => {
    var texts = '';
    switch (this.props.language) {
      case 'English':
        texts = english;
        break;
      case 'Polish':
        texts = polish;
        break;
      default:
        texts = english;
    }
    let i = Math.floor(Math.random() * texts.length);
    text = texts[i].text
    source = texts[i].source
    this.getTextReady()
  }


  getText = async () => {
    if (!this.props.random) {
      await this.readFromFile();
    }
    else {
      text = this.makeRandomSentence()
      this.getTextReady()
    }
  }


  getTextReady = () => {
    arrText = text.split('');
    textToShow = text.slice(0);
    //count how many words
    let s = text;
    s = s.replace(/(^\s*)|(\s*$)/gi, "");
    s = s.replace(/[ ]{2,}/gi, " ");
    s = s.replace(/\n /, "\n");
    let howManyWords = s.split(' ').length
    oneWordProgress = 100 / howManyWords;
    howManyChar = text.length;
  }

  //----------for random letters----------
  textLenght = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  makeRandomSentence = () => {
    let length = this.textLenght(65, 400)
    let result = [];
    let characters = 'ab cdefghijklmno pqrs tuvwxyz .';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      let letter = characters.charAt(Math.floor(Math.random() * charactersLength));
      if (result[result.length - 1] === ' ') {
        if (result[result.length - 2] === '.') {
          letter = letter.toUpperCase()
        }
        if (letter === ' ') {
          continue;
        }
        if (letter === '.') {
          continue;
        }

      }

      if (letter === '.') {
        result.push('.')
        result.push(' ')
        continue;
      }
      result.push(letter)
    }
    result.push('.')
    result = result.join('')
    result = result.charAt(0).toUpperCase() + result.slice(1)
    return result;
  }
  //------------------------------------

  writingTime = () => {
    this.intervalWritingTime = setInterval(() => {
      this.setState(prevState => ({
        writingTime: prevState.writingTime + 1,
        wpm: Math.round(words / (this.state.writingTime / 60))
      }));
    }, 1000);
  }

  callbackFunction = (childData) => {
    this.setState({ lowestWPM: childData })
  }

  resetApp = () => {
    this.start()
  }

  updateInputValue = (e) => {
    arrText = text.split('');
    arrText.splice(0, completedWords.length)
    var rest = arrText.slice();
    completedText = [];
    let wrong = [];
    textToShow = [];
    var input = e.target.value.slice(0);
    this.setState({
      inputValue: input
    });
    for (let n = 0; n < input.length; n++) {
      if (input[n] === arrText[n]) {
        //the letter is correct
        completedText.push(input[n])
        rest.splice(0, 1)
        if (n + 1 === arrText.length) {
          this.end()
        }
        if (n + 1 === input.length && input.slice(-1) === ' ') {
          //end of word
          words++;
          completedWords += input;
          completedText = [];
          let progressTemp = oneWordProgress
          let currentWPM = Math.round(words / (this.state.writingTime / 60));
          this.setState(prevState => ({
            inputValue: '',
            progress: prevState.progress + progressTemp,
            wpm: currentWPM,
          }));
        }
      }
      else {
        //the letter is incorrect
        rest.splice(0, 1)
        wrong.push(arrText[n])
        break;

      }
    }


    textToShow.push(
      <p style={noCopy} key="textToShow">
        <span style={{ backgroundColor: '#00bd06' }}>
          {completedWords}
        </span>
        <span style={{ backgroundColor: '#00bd06' }}>
          {completedText}
        </span>
        <span style={{ backgroundColor: 'f00000' }}>
          {wrong}
        </span>
        <span>
          {rest}
        </span>
      </p>
    )
  }


  end = () => {
    //end of text
    words++
    //stop counting
    clearInterval(this.intervalWritingTime)
    this.setState({
      disabled: true,
      inputValue: '',
      progress: 100,
      wpm: Math.round(words / (this.state.writingTime / 60)),
      howManyChar: (howManyChar / this.state.writingTime).toFixed(2),
      winScreen: true,
    });
    //this.checkIfTop()
  }

  // checkIfTop = () => {
  //   if (parseFloat(this.state.wpm) > this.state.lowestWPM) {
  //     console.log('you are in top')
  //   }
  // }


  render() {
    return (
      <div style={{
        width: '100%',
        textAlign: 'center'
      }}>
        <div style={{ width: '70%', height: '100%', margin: '0 auto', backgroundColor: '#6ba4ff', display: 'inline-block', borderRadius: '20px' }}>
          {this.state.disabled ? (
            <div style={{ textAlign: 'center', position: 'absolute', top: '0px', zIndex: '20' }}>
              <h1 style={{ fontSize: '150%', margin: '20px' }}>Start in:</h1>
              <div>
                <div>
                  <p className='numbers' style={{ fontSize: '150%' }}>{this.state.timeToStart}</p>
                </div>
              </div>
            </div>) : (
              <div>
              </div>)}
          <div style={{ width: '70%', position: 'relative', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'lightGray', textAlign: 'center', fontSize: '180%', top: '40%', padding: '20px', borderRadius: '20px' }}>
            <ProgressBar progress={this.state.progress} wpm={this.state.wpm} />
            <div style={{ marginTop: '20px' }}>
              <div >{textToShow}</div>
            </div>
            <input value={this.state.inputValue}
              onChange={this.updateInputValue}
              style={{ width: '70%' }}
              ref={(input) => { this.nameInput = input; }}
              disabled={this.state.disabled} />
            <br />
            {this.state.writingTime}
            <div style={{ height: this.state.timeToStart * 10, backgroundColor: this.state.color }}></div>
          </div>
          <div style={{
            position: 'absolute',
            bottom: '5%',
            clear: 'left',
            width: '70%'
          }}>
            <MenuButton style={{ textAlign: 'left' }} />
            <button className="tryAgain" onClick={this.tryAgain}><span>Try Again </span></button>
            <Restart style={{ textAlign: 'right' }} resetApp={this.resetApp} />
          </div>
        </div>
        {/* <div style={{ display: 'inline-block', textAlign: 'right', float: 'right' }}>
          <TopList parentCallback={this.callbackFunction} />
        </div> */}
        {this.state.winScreen ? (
          <div>
            <WinScreen wpm={this.state.wpm} source={source} howManyChar={this.state.howManyChar} random={this.props.random} />
          </div>) :
          (
            <div></div>
          )}
      </div>
    );
  }
}
