import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { setCity } from '../actions/cities';
import Switcher from './switcher';
import * as appActions from '../actions/app';
import './Forecast.styl';

const DAYS = ['sunday', 'monday', 'tuesday', 'thursday', 'friday', 'saturday'];
const MONTHS = ['January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

class Forecast extends Component {
  componentDidMount() {
    if (!this.props.city.name) {
      this.props.history.push('/');
      return
    }
    const { lat, lng } = this.props.city;
    this.props.fetchForecast({ lat, lng });
  }

  render() {
    if (!this.props.city.name) {
      return null;
    }

    const dt = new Date();

    let mainElem = null;
    if (this.props.forecast.loading) {
      mainElem = <div className='flex-1 flex-align-items-center'>
        <div className='loader loader-big'></div>
      </div>;
    } else if (this.props.forecast.data.cod === '400') {
      mainElem = <div className='flex-1 flex-align-items-center'>
        Error while trying to fetch forecast. Please, try later.
      </div>;
    } else {
      mainElem = <div className='flex-1 font-regular margin-top-sm font-1-5'>
        <div>{this.props.forecast.data.list[0].weather[0].main}</div>
      </div>
    }

    return <div className='flex-1 flex-column'>
      <HeaderComp {...this.props} />
      <i class="wi wi-night-sleet"></i>
      <div className='date-container margin-top-lg'>{`${DAYS[dt.getDay()]}, ${MONTHS[dt.getMonth()]} ${dt.getDate()}th ${dt.getFullYear()}`}</div>
      {mainElem}
    </div>;
  }
}


const HeaderComp = connect(null, dispatch => bindActionCreators({ setCity }, dispatch))(withRouter(props => <header>
  <div>
    <i onClick={() => {
      props.setCity({});
      props.history.push('/');
    }} className="material-icons pointer">keyboard_arrow_left</i>
    <span className="app-title">{props.city.name}</span>
  </div>
  <div>
    <Switcher />
  </div>
</header>));

export default connect(({app, forecast}) => ({
  city: app.city,
  forecast
}), dispatch => bindActionCreators(appActions, dispatch))(Forecast);
