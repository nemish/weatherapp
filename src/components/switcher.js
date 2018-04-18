import React from 'react';
import './switcher.styl';


export default props => {
  return <label className="switch">
    <input type="checkbox" onClick={props.onChange} defaultChecked={props.scale === 'C'} />
    <span className="slider round"></span>
    <div className="slider-text slider-text--left">&deg;C</div>
    <div className="slider-text slider-text--right">&deg;F</div>
  </label>
};