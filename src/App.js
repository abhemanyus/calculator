import { Component } from 'react';
import './App.css';
function add(one, two) {
  return one + two;
}
function sub(one, two) {
  return one - two;
}
function mul(one, two) {
  return one*two;
}
function div(one, two) {
  if (two === 0.0) {
    return null;
  }
  return one / two;
}
const operators = {"+": add, "-": sub, "*": mul, "/": div};
const ops = {"+": "add", "-": "subtract", "*": "multiply", "/": "divide"};
const numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operation: [],
      current: ""
    };

    this.numButtons = [];
    for (let index = 0; index < 10; index++) {
      this.numButtons.push(<button key={index} id={numbers[index]}
      onClick={() => this.handleNum(index)}>{index.toString()}</button>)    
    }

    const opKeys = Object.keys(operators);
    this.opButtons = [];
    for (let index = 0; index < opKeys.length; index++) {
      this.opButtons.push(<button key={opKeys[index]} id={ops[opKeys[index]]}
      onClick={() => this.handleOp(opKeys[index])}>{opKeys[index]}</button>)      
    }
  }

  execute = () => {
    let operation = [];
    for (let index = 0; index < this.state.operation.length; index++) {
      const element = this.state.operation[index]
      if (operators[element] && operators[this.state.operation[index+1]]) {
        continue;
      }
      if (operators[element]) {
        if (element === "-") {
          if (operators[this.state.operation[index-1]]) {
            operation.push(operators[this.state.operation[index-1]]);
            operation.push(-1*parseFloat(this.state.operation[index+1]));
            index = index + 2;
            continue;
          }
          else {
            operation.push(operators["-"]);
          }
        }
        else {
          operation.push(operators[element]);
        }
      }
      else {
        operation.push(parseFloat(element));
      }
    }
    console.log(this.state.operation);
    console.log(operation);
    let result = 0;
    for (let index = 1; index < operation.length; index = index + 2) {
      const element = operation[index];
      result = element(operation[index-1], operation[index+1]);
      operation[index+1] = result;
    }
    this.setState(prevState => ({
      operation: [],
      current: result === null ? "null" : result.toString()
    }));
  }

  handleNum = (num) => {
    this.setState(prevState => ({
      ...prevState,
      current: prevState.current.concat(num.toString()).replace(/^0+(\d)/, "$1")
    }));
  }

  handleDecimal = () => {
    if(this.state.current.indexOf(".") === -1){
      this.setState(prevState => ({
        ...prevState,
        current: prevState.current.concat(".")
      }));
    }
  }

  handleOp = (op) => {
    this.setState(prevState => ({
      ...prevState,
      operation: prevState.current !== "" ? [...prevState.operation, prevState.current, op]
      : [...prevState.operation, op],
      current: ""
    }));
  }

  handleSubmit = () => {
    if (this.state.operation.length === 0 && this.state.current === "null") {
      this.setState({
        operation: [],
        current: ""
      });
    }
    else {
      this.setState(prevState => ({
        ...prevState,
        operation: [...prevState.operation, prevState.current],
        current: ""
      }),
      this.execute);
    }
  }
  
  render() {
    return (
      <div className="App">
        <form onSubmit={(e) => e.preventDefault()}>
          <p id="display">{this.state.current}</p>
          {this.numButtons}
          {this.opButtons}
          <button onClick={this.handleDecimal} id="decimal">.</button>
          <button onClick={this.handleSubmit} id="equals">=</button>
          <button onClick={() => 
          this.setState({operation: [], current: "0"})}
          id="clear">CE</button>
        </form>
      </div>
    )
  }
}

export default App;
