import React from 'react';
import ProgressBar from './ProgressBar';
import TopList from './TopList';
import WinScreen from './WinScreen';
import TryAgain from './TryAgain'
import MenuButton from './MenuButton'
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
    }
    console.log(this.props.language)

  }


  componentDidMount() {
    this.start()
  }

  start = async () => {
    //reset everything
    clearInterval(this.intervalTimeToStart)
    clearInterval(this.intervalWritingTime)
    text = "";
    source = "";
    arrText = [];
    textToShow = [];
    words = 0;
    completedText = [];
    completedWords = [];
    oneWordProgress = [];
    this.setState({
      inputValue: '',
      disabled: true,
      timeToStart: 5,
      writingTime: 0,
      wpm: 0,
      progress: 0,
      winScreen: false,
      lowestWPM: '',
    })


    await this.readFromFile();
    this.intervalTimeToStart = setInterval(() => {
      if (this.state.timeToStart > 1) {
        this.setState(prevState => ({
          timeToStart: prevState.timeToStart - 1
        }));
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

  readFromFile = () => {
    var texts='';
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
    arrText = text.split('');
    textToShow = text.slice(0);
    //count how many words
    let s = text;
    s = s.replace(/(^\s*)|(\s*$)/gi, "");
    s = s.replace(/[ ]{2,}/gi, " ");
    s = s.replace(/\n /, "\n");
    let howManyWords = s.split(' ').length
    oneWordProgress = 100 / howManyWords;
  }


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
        if (input.slice(-1) === ' ') {
          break;
        }
        else {
          rest.splice(0, 1)
          wrong.push(arrText[n])
          break;
        }
      }
    }


    textToShow.push(
      <div>
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
      </div>
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
      winScreen: true,
    });
    console.log('you won')
    this.checkIfTop()
  }

  checkIfTop = () => {
    if (parseFloat(this.state.wpm) > this.state.lowestWPM) {
      console.log('you are in top')
    }
  }


  render() {
    return (
      <div style={{
        width: '100%',
        textAlign: 'center'
      }}>
        <div style={{ width: '50%', height: '100%', margin: '0 auto', backgroundColor: '#6ba4ff', display: 'inline-block' }}>
          {this.state.disabled ? (
            <div style={{ textAlign: 'center', zIndex: '20' }}>
              <p style={{ fontSize: '150%' }}>Start in:</p>
              <div>
                <div>
                  <p className='numbers' style={{ fontSize: '150%' }}>{this.state.timeToStart}</p>
                </div>
              </div>
            </div>) : (
              <div style={{ textAlign: 'center', marginLeft: '90px' }} >
              </div>)}
          <div style={{ width: '700', position: 'absolute', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'lightGray', textAlign: 'center', fontSize: '130%', top: '30%', margin: '20px', padding: '20px' }}>
            <ProgressBar progress={this.state.progress} wpm={this.state.wpm} />
            <div style={{ marginTop: '20px' }}>
              <p style={noCopy}>{textToShow}</p>
            </div>
            <input value={this.state.inputValue}
              onChange={this.updateInputValue}
              style={{ width: '700' }}
              ref={(input) => { this.nameInput = input; }}
              disabled={this.state.disabled} />
            {this.state.writingTime}
          </div>
          <div style={{
            position: 'absolute',
            bottom: '5%',
            clear: 'left',
            width: '50%'
          }}>
            <MenuButton style={{ textAlign: 'left' }} />

            <TryAgain style={{ textAlign: 'right' }} resetApp={this.resetApp} />
          </div>
        </div>
        {/* <div style={{ display: 'inline-block', textAlign: 'right', float: 'right' }}>
          <TopList parentCallback={this.callbackFunction} />
        </div> */}
        {this.state.winScreen ? (
          <div>
            <WinScreen wpm={this.state.wpm} source={source} />
          </div>) :
          (
            <div></div>
          )}
      </div>
    );
  }
}
