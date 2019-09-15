import React from 'react';
import ProgressBar from './ProgressBar'

let text1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

let text2 = 'Taki testowy tekst sobie napisze zeby sprawdzac';
let text3 = "We're all pretty bizarre. Some of us are just better at hiding it, that's all."
let text = "I'd tell you all you want and more, if the sounds I made could be what you hear."
var arrText = [];
var textToShow = [];
var words = 0;
let completedText = [];
let completedWords = [];
let oneWordProgress = 0;
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      disabled: true,
      timeToStart: 5,
      writingTime: 0,
      wpm: 0,
      progress: 0
    }
    arrText = text.split('');
    textToShow = text.slice(0);
    //count how many words
    let s = text;
    s = s.replace(/(^\s*)|(\s*$)/gi, "");
    s = s.replace(/[ ]{2,}/gi, " ");
    s = s.replace(/\n /, "\n");
    let howManyWords = s.split(' ').length
    console.log(howManyWords)
    oneWordProgress = 100 / howManyWords;
  }


  componentDidMount() {
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
          words++
          //stop counting
          clearInterval(this.intervalWritingTime)
          this.setState({
            disabled: true,
            inputValue: '',
            progress: 100,
            wpm: Math.round(words / (this.state.writingTime / 60)),
          });
          console.log('you won')
        }
        if (n + 1 === input.length && input.slice(-1) === ' ') {
          //end of word
          words++;
          completedWords += input;
          completedText = [];
          let progressTemp = oneWordProgress
          this.setState(prevState => ({
            inputValue: '',
            progress: prevState.progress + progressTemp,
            wpm: Math.round(words / (this.state.writingTime / 60)),
          }));
          console.log(this.state.progress)
          console.log('spacja');
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
      <div style={{ margin: '50px' }}>
        <div>
          {this.state.wpm} wpm
        </div>
        <div style={{ width: '700', display: 'inline-block', backgroundColor: 'lightGray', fontSize: '130%', top: '20px', margin:'20px' }}>
          <ProgressBar progress={this.state.progress} />
          <div style={{marginTop:'20px'}}>
            {textToShow}
          </div>
          <input value={this.state.inputValue}
            onChange={this.updateInputValue}
            style={{ width: '700' }}
            ref={(input) => { this.nameInput = input; }}
            disabled={this.state.disabled} />
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
            <div>

            </div>)}
        <div>

        </div>
        {this.state.writingTime}
      </div>
    );
  }
}
