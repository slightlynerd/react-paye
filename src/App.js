import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lol: 'lol',
    };
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{this.state.lol}</p>
          <h2>It is {new Date().toLocaleTimeString()}.</h2>
          <form onSubmit={calculateTax}>
            <input id="gi" type="text" name="taxable" placeholder="Enter Gross Income"></input>
            <input id="children" type="number" name="quantity" min="1" max="12"></input>
            <button type="submit">Calculate Tax</button>
          </form>
        </div>
      </div>
    );
  }
}

function calculateTax(event) {
  event.preventDefault();
  var grossIncome = document.getElementById('gi').value;
  var children = document.getElementById('children').value;

  var exemptions = getExemptions(grossIncome);
  exemptions += 184615 + 28846;
  console.log('Exceptions: ', exemptions);

  var childRelief = getChildRelief(children);
  console.log('Child relief: ', childRelief);

  var taxableIncome = grossIncome - (exemptions + childRelief);
  console.log('Taxable Income: ', taxableIncome);

  var taxPercent = [0.07, 0.11, 0.15, 0.19, 0.21, 0.24];
  var taxBits = [300000, 300000, 500000, 500000, 1600000, 3200000];
  var i = 0;
  var tax = 0;

  while (taxableIncome > 0) {
    if (taxableIncome > taxBits[i]) {
      tax += taxBits[i] * taxPercent[i];
      taxableIncome -= taxBits[i];
    }
    else {
      tax += taxableIncome * taxPercent[i];
      taxableIncome = 0;
    }
    i++;
  }
  console.log('PAYE: ', tax);
}

function getExemptions(income) {
  if (income >= 200000) {
    return (0.2 * income) + 200000;
  }
  else {
    return 0.01 * income;
  }
}

function getChildRelief(children) {
  var relief = 0;
  for (var i = 0; i < children; i++) {
    relief += 2500;
    console.log(relief);
  }
  return relief;
}

class Test extends Component {
  render() {
    return (
      <div>Hello {this.props.name}</div>
    );
  }
}

export default App;
