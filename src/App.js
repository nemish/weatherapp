import React, { Component } from 'react';
import 'material-design-icons';
import './App.styl';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Intro from './components/Intro';
import Forecast from './components/Forecast';


const NoMatch = () => <div className='flex-1 flex-align-items-center flex-column'>
  <div>Url not found</div>
  <div><Link to='/'>To home screen</Link></div>
</div>


class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <div className="container">
            <Switch>
              <Route exact path='/' component={Intro} />
              <Route path='/city/:name' component={Forecast} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
