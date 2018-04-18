import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DAYS } from '../utils/constants';
import WeatherIcons from '../assets/weather-icons.json';

const kelvinToCelsius = temp => (temp - 273.15).toFixed(0)
const kelvinToFahrenheit = temp => ((temp - 273.15) * 1.8 + 32).toFixed(0)

const DAY_SECTIONS_MAP = {
  0: 'Night',
  6: 'Morning',
  12: 'Day',
  18: 'Evening'
};

const getIsoDateStr = date => {
  const year = date.getFullYear();
  let month = date.getMonth()+1;
  let dt = date.getDate();

  if (dt < 10) {
    dt = '0' + dt;
  }
  if (month < 10) {
    month = '0' + month;
  }
  return year + '-' + month + '-' + dt;
}

const getTodayItems = items => {
  const now = new Date();
  const dateStr = getIsoDateStr(now);
  return items.filter(item => item.dt_txt.indexOf(dateStr) > -1);
}

const getNowItem = items => {
  const now = new Date();
  const nowHours = now.getHours();

  return items.map(item => {
    return {
      item,
      diff: Math.abs(new Date(item.dt * 1000).getHours() - nowHours)
    }
  }).sort((prev, next) => {
    return prev.diff - next.diff;
  })[0].item;
}

class ForecastBoard extends Component {
  render() {
    const todayItems = getTodayItems(this.props.items);
    const now = getNowItem(todayItems);
    const tempFn = this.props.scale === 'C' ? kelvinToCelsius : kelvinToFahrenheit;
    const nowWeather = now.weather[0];
    const days = {};
    this.props.items.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      if (days[date]) {
        return;
      }
      days[date] = item;
    });

    return <div className='flex-1 font-regular margin-top-sm font-1-5'>
      <div>{nowWeather.main}</div>
      <div className='flex flex-wrap'>
        <div className='main-info color-warm'>
          {tempFn(now.main.temp)}&deg;{this.props.scale}
        </div>
        <div className='main-info color-warm'>
          <i className={`wi wi-${WeatherIcons[nowWeather.id.toString()].icon}`}></i>
        </div>
        <div className='flex flex-column color-warm text-small'>
          {todayItems.map(item => {
            const hours = new Date(item.dt * 1000).getHours();
            return {
              item,
              daySection: DAY_SECTIONS_MAP[hours]
            };
          }).filter(item => item.daySection).map(({item, daySection}) => {
            return <div key={daySection}>{daySection} {tempFn(item.main.temp)}&deg;{this.props.scale}</div>
          })}
        </div>
      </div>
      <div className='flex flex-space-between margin-top-lg'>
        {Object.keys(days).sort((prev, next) => prev > next).map(key => {
          const item = days[key];
          const dt = new Date(item.dt * 1000);
          return <div class='flex flex-column flex-align-items-center' key={key}>
            <div class='text-xs text-capitalize'>{DAYS[dt.getDay()]}</div>
            <div><i className={`wi wi-${WeatherIcons[item.weather[0].id.toString()].icon}`}></i></div>
            <div class='text-xs'>{tempFn(item.main.temp)}&deg;{this.props.scale}</div>
          </div>
        })}
      </div>
    </div>
  }
}



export default connect(state => ({scale: state.app.scale}))(ForecastBoard);