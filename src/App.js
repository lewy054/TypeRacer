import React from 'react';

let text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

let text1 = 'Taki testowy tekst';
var arrText = [];
var textToShow = [];
var words = 0;
let completedText = [];
let completedWords = [];
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      disabled:false,
    }
    arrText = text.split('');
    textToShow = text.slice(0);

  }

  updateInputValue = (e) => {
    arrText = text.split('');
    arrText.splice(0, completedWords.length)
    var rest = arrText.slice();
    console.log(arrText)
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
        if (n+1 == arrText.length) {
          words++
          this.setState({
            disabled: true,
            inputValue: '',
          });
          console.log('you won')
        }
        if (n+1===input.length && input.slice(-1) === ' ') {
          //end of word
          words++;
          completedWords += input;
          completedText = [];
          
          this.setState({
            inputValue: ''
          });
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
      <div>
        <div>
          {words} wpm
        </div>

        <div style={{ width: '700' }}>
          {textToShow}
        </div>

        <div>
          <input value={this.state.inputValue}
            onChange={this.updateInputValue}
            style={{ width: '700' }}
            autoFocus
            disabled={this.state.disabled} />
        </div>
      </div>
    );
  }
}
