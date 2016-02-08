import Radium from 'radium';
import React from 'react';
import { weekdays, months } from '../constants/dateTimeConstants';
import * as ClockActions from '../Redux/Modules/ClockReducer';

class Clock extends React.Component {
  componentDidMount () {
    this.interval = setInterval(() => {
      ClockActions.updateDateTime();
      this.forceUpdate();
    }, 60000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render() {
    const dateTime = JSON.parse(ClockActions.getState().toString().replace(/Map/g,'')).dateTime;
    const tod = dateTime.hour < 12 ? 'am' : 'pm';
    const hour = dateTime.hour % 12 === 0 ? 12 : dateTime.hour % 12;
    const minute = dateTime.minute < 10 ? '0' + dateTime.minute : dateTime.minute;
    const day = dateTime.day;
    const weekday = dateTime.weekday;
    const month = dateTime.month;

    return (
      <div>
        <div style={ styles.center }>
          <h1 style={ styles.text }>{ hour }:{ minute }</h1><h2 style={ styles.text }>{ tod }</h2>
        </div>
        <div style={ styles.center }>
          <h2>{ weekdays[weekday] }, { months[month] } { day }</h2>
        </div>
      </div>
    );
  }
};

const styles = {
  text: {
    display: 'inline',
  },
  center: {
    textAlign: 'center',
  },
};

export default Radium(Clock);
