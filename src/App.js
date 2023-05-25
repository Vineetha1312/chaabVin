import {Component} from 'react'

import './App.css'

const textList = [
  'Data scientists gather and analyze large sets of structured and unstructured data',
  'IoT Developers are professionals who can develop, manage, and monitor IoT devices.',
  'A VR developer creates completely new digital environments that people can see.',
  'Machine learning engineers feed data into models defined by data scientists.',
  'When you have confidence, you can have a lot of fun',
  'Life is either a daring adventure or nothing at all',
  'If you are not having fun, you are doing something wrong',
]

class App extends Component {
  state = {
    inputText: '',
    text: 'Hello, Welcome to Typing Tool',
    numberOfKeys: [],
    timeInMinutes: 4,
    timeInSeconds: 60,
    wpmCount: 0,
    isTextMatched: true,
  }

  componentDidMount() {
    this.timerId = setInterval(this.tick, 1000)
  }

  tick = () => {
    const {timeInMinutes, timeInSeconds, isGameRunning} = this.state
    if (timeInSeconds < 0 || isGameRunning === true || timeInMinutes < 0) {
      this.setState({
        timeInSeconds: 0,
        timeInMinutes: 0,
      })
      this.setState(prevState => ({
        timeInMinutes: prevState.timeInMinutes - 1,
      }))
    } else {
      this.setState(prevState => ({
        timeInSeconds: prevState.timeInSeconds - 1,
      }))
    }
  }

  setTimeInFormat = () => {
    const {timeInSeconds, timeInMinutes} = this.state
    const minutes = timeInMinutes < 0 ? 0 : timeInMinutes
    const strigifiedSeconds =
      timeInSeconds > 9 ? timeInSeconds : `0${timeInSeconds}`
    const strigifiedMinutes = timeInMinutes > 5 ? timeInMinutes : `0${minutes}`
    return `${strigifiedMinutes}:${strigifiedSeconds}`
  }

  onChangeInputText = event => {
    this.setState({inputText: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const add = (accumulator, a) => accumulator + a
    const randomNumber = Math.ceil(Math.random() * textList.length)
    const {inputText, text, numberOfKeys} = this.state
    numberOfKeys.push(inputText.length)
    const sumOfKeys = numberOfKeys.reduce(add, 0)

    this.setState({wpmCount: sumOfKeys})

    if (text !== inputText) {
      this.setState({isTextMatched: false})
    } else {
      this.setState({
        text: textList[randomNumber],
        inputText: '',
        isTextMatched: true,
      })
    }
  }

  render() {
    const {inputText, text, wpmCount, isTextMatched} = this.state

    const time = this.setTimeInFormat()
    const errorText = isTextMatched ? ' ' : 'error-bg'
    return (
      <div className="bg-container">
        <h1 className="count-text">
          Game Ends In: <span className="count">{time}</span>
        </h1>
        <div className="typing-card">
          <h1>{text}</h1>
          <form className="input-type-container" onSubmit={this.onSubmitForm}>
            <input
              type="text"
              placeholder="Re-type if failed, press <TAB> or <ESC> to reset"
              className={`input-element ${errorText}`}
              onChange={this.onChangeInputText}
              value={inputText}
            />
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
          <p className="key-count">Key count: {wpmCount}</p>
        </div>
      </div>
    )
  }
}

export default App
