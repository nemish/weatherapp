import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { setCity } from '../actions/cities';
import { toggleScale } from '../actions/app';
import Switcher from './switcher';


export default connect(
  state => {
    return {
      scale: state.app.scale
    }
  },
  dispatch => bindActionCreators({ setCity, toggleScale }, dispatch)
)(withRouter(props => <header>
  <div>
    <i onClick={() => {
      props.setCity({});
      props.history.push('/');
    }} className="material-icons pointer">keyboard_arrow_left</i>
    <span className="app-title">{props.city.name}</span>
  </div>
  <div>
    <Switcher onChange={props.toggleScale} scale={props.scale} />
  </div>
</header>));