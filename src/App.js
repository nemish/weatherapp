import React, { Component } from 'react';
import Switcher from './components/switcher';
import 'material-design-icons';
import './App.styl';


const Header = () => <header>
  <div>
    <i className="material-icons">keyboard_arrow_left</i>
    <span className="app-title">Tallin</span>
  </div>
  <div>
    <Switcher />
  </div>
</header>


class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="container">
          <Header />
        </div>
      </div>
    );
  }
}

export default App;
