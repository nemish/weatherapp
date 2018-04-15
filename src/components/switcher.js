import React, { Component } from 'react';
import './switcher.styl';

export default () => {
  return <label className="switch">
    <input type="checkbox" />
    <span className="slider round"></span>
    <div className="slider-text slider-text--left">&deg;C</div>
    <div className="slider-text slider-text--right">&deg;F</div>
  </label>
};