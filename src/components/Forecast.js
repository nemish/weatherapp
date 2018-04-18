import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HeaderComp from './Header';
import DateInfo from './DateInfo';
import ForecastBoard from './ForecastBoard';
import * as appActions from '../actions/app';
import './Forecast.styl';

class Forecast extends Component {
  constructor(props) {
    super(props);
    this._fetchForecast = this._fetchForecast.bind(this);
  }

  componentDidMount() {
    if (!this.props.city.name) {
      this.props.history.push('/');
      return
    }
    this._fetchForecast();
  }

  _fetchForecast() {
    const { lat, lng } = this.props.city;
    this.props.fetchForecast({ lat, lng });
  }

  render() {
    if (!this.props.city.name) {
      return null;
    }

    let mainElem = null;
    if (this.props.forecast.loading) {
      mainElem = <div className='flex-1 flex-align-items-center'>
        <div className='loader loader-big'></div>
      </div>;
    } else if (!this.props.forecast.data.cod || this.props.forecast.data.cod === '400') {
      mainElem = <div className='flex-1 flex-align-items-center flex-column'>
        Error while trying to fetch forecast. Please, try later.
        <div className='btn' onClick={this._fetchForecast}>Retry</div>
      </div>;
    } else {
      mainElem = <ForecastBoard items={this.props.forecast.data.list} />
    }

    return <div className='flex-1 flex-column'>
      <HeaderComp {...this.props} />
      <DateInfo />
      {mainElem}
    </div>;
  }
}



export default connect(({app, forecast}) => ({
  city: app.city,
  forecast
}), dispatch => bindActionCreators(appActions, dispatch))(Forecast);
