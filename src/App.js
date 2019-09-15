import React from 'react';
import ProgressBar from './ProgressBar';
import TopList from './TopList';
import WinScreen from './WinScreen';
import { texts } from './content/texts.json';

let text = ""
var arrText = [];
var textToShow = [];
var words = 0;
let completedText = [];
let completedWords = [];
let oneWordProgress = 0;
const noCopy={
    webkitUserSelect: 'none',  /* Chrome all / Safari all */
    mozUserSelect: 'none',     /* Firefox all */
    msUserSelect: 'none',      /* IE 10+ */
    userSelect: 'none',          /* Likely future */     
  
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
      winScreen:false,
    }

  }


  async componentDidMount() {
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
    let i = Math.floor(Math.random() * texts.length);
    text = texts[i].text
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
          //end of text
          words++
          //stop counting
          clearInterval(this.intervalWritingTime)
          this.setState({
            disabled: true,
            inputValue: '',
            progress: 100,
            wpm: Math.round(words / (this.state.writingTime / 60)),
            winScreen:true,
          });
          console.log('you won')
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


  render() {
    return (
      <div style={{ margin: '100px' }}>
        <div style={{ width: '700', display: 'inline-block', backgroundColor: 'lightGray', fontSize: '130%', top: '20px', margin: '20px' }}>
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
        {!this.intervalWritingTime ? (
          <div style={{ display: 'inline-block', textAlign: 'center', marginLeft: '90px' }}>
            <p style={{ fontSize: '150%' }}>Start in:</p>
            <div>
              <div>
                <p style={{ fontSize: '150%' }}>{this.state.timeToStart}</p>
              </div>
            </div>
          </div>) : (
            <div style={{ display: 'inline-block', textAlign: 'center', marginLeft: '90px' }} >
            </div>)}
        <div style={{ display: 'inline-block', textAlign: 'right', float: 'right' }}>
          <TopList />
        </div>
        {this.state.winScreen ? (
          <div>
            <WinScreen wpm={this.state.wpm}/>
          </div>) :
          (
            <div></div>
          )}
      </div>
    );
  }
}
