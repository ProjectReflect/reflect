import Radium from 'radium';
import React from 'react';
import { weekdays, months } from '../constants/dateTimeConstants';
import * as ClockActions from '../Redux/Modules/ClockReducer';

class Clock extends React.Component {
  componentDidMount () {
    this.interval = setInterval(() => {
      ClockActions.updateDateTime();
      this.forceUpdate();
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render() {
    const dateTime = ClockActions.getState().get('dateTime');
    const tod = dateTime.get('hour') < 12 ? 'am' : 'pm';
    const hour = dateTime.get('hour') % 12 === 0 ? 12 : dateTime.get('hour') % 12;
    const minute = dateTime.get('minute') < 10 ? '0' + dateTime.get('minute') : dateTime.get('minute');
    const day = dateTime.get('day');
    const weekday = dateTime.get('weekday');
    const month = dateTime.get('month');

    return (
      <div>
        <div style={ styles.center }>
          <h1 style={ styles.text }>{ hour }:{ minute }</h1><h3 style={ styles.text }>{ tod }</h3>
        </div>
        <div style={ styles.center }>
          <h3>{ weekdays[weekday] }, { months[month] } { day }</h3>
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
