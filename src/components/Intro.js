import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as citiesActions from '../actions/cities';
import { withRouter } from 'react-router'
import './Intro.styl';


const mapStateToProps = state => ({
  cities: state.cities,
  city: state.app.city
});

const mapDispatchToProps = dispatch => bindActionCreators(citiesActions, dispatch)


class CityOption extends Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  _onClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.closeList();
    this.props.chooseCity(this.props.city);
  }

  render() {
    const { city } = this.props;
    return <div onClick={this._onClick} className='city-option'>{city.name}, {city.iso2}</div>;
  }
}


class Intro extends Component {

  constructor(props) {
    super(props);
    this._setCurrentPosition = this._setCurrentPosition.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._refresh = this._refresh.bind(this);
    this._removeFocus = this._removeFocus.bind(this);
    this._chooseCity = this._chooseCity.bind(this);
    this._checkWeather = this._checkWeather.bind(this);
    this.state = {
      value: '',
      city: null,
      focused: false,
      error: null
    }
  }

  componentDidMount() {
    if (this.props.city.name) {
      this.props.history.push(`/city/${this.props.city.name.replace(' ', '_')}`);
    }
  }

  _onChange(e) {
    this.setState({
      value: e.currentTarget.value,
      city: null,
      error: null
    }, this._refresh);
  }

  _refresh() {
      if (this.state.value.length >= 3) {
        const name = this.state.value;
        this.props.fetchCities({ name });
      } else if (this.props.cities.data.length) {
        this.props.resetItems();
      }
  }

  _onFocus(e) {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if (!this.state.focused) {
      this.setState({
        focused: true
      });
    }
  }

  _chooseCity(city) {
    this.setState({
      value: city.name,
      city: city
    });
  }

  _removeFocus() {
    this.setState({
      focused: false
    });
  }

  _checkWeather(e) {
    this.props.setCity(this.state.city);
    this.props.history.push(`/city/${this.state.city.name.replace(' ', '_')}`);
  }

  _setCurrentPosition(e) {
    if (!this.props.cities.loading) {
      this.setState({
        error: null
      }, () => {
        this.props.fetchCitiesByLocation().then(data => {
          this._chooseCity(data.items[0]);
        }).catch(() => {
          this.setState({
            error: 'Error with utilizing geolocation. Try to find your city by typing a name'
          })
        });
      })
    }
  }

  render() {
    let optionsList = null;
    if (this.state.focused) {
      optionsList = <div className='cities-options-container'>
        {this.props.cities.data.map(city => {
          return <CityOption key={`${city.lat}-${city.lng}`}
                             city={city}
                             closeList={this._removeFocus}
                             chooseCity={this._chooseCity} />
          }
        )}
      </div>;
    }

    let icon = <i className='material-icons search-icon'>search</i>;
    if (this.props.cities.loading) {
      icon = <div className='search-icon'>
        <div className='loader'></div>
      </div>;
    }

    let btn = null;
    if (this.state.city) {
      btn = <div onClick={this._checkWeather} className='btn'>Check weater</div>
    }

    let error = null;
    if (this.state.error) {
      error = <div className='text-center error'>{this.state.error}</div>
    }

    return <div className='flex-1 flex-align-items-center flex-column' onClick={this._removeFocus}>
      <div className='city-input-container'>
        <input type='text'
               onFocus={this._onFocus}
               onClick={this._onFocus}
               onChange={this._onChange}
               onBlur={this._onBlur}
               value={this.state.value}
               className='city-input'
               placeholder='City' />
        {icon}
        {optionsList}
      </div>
      <div className='margin-top-sm'>
        {error}
        <div className='text-center'>or</div>
        <div className='text-center'>
          <span>use my </span><span className='inline-link-button' onClick={this._setCurrentPosition}>current position</span>
        </div>
      </div>
      <div className='margin-top-sm text-center'>
        {btn}
      </div>
    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Intro));
