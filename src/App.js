import React, { Component } from 'react';
import './App.css';
import Channel from './components/Channel/Channel.js';
import json from './data/channels.json';

let data = json.channels;


var result = data;
console.log(data);
class App extends Component {
  render() {
    return (
      <div className="App">
        {data.map(function(el, i) {
          return <Channel key={i} channel={el}/>;
        })}
      </div>
    );
  }
}

export default App;
