import Radium from 'radium';
import React from 'react';
import * as ClockActions from '../Redux/Modules/ClockDuck';

class Clock extends React.Component {
  render() {
    console.log(ClockActions.reducer());
    return (
      <div>
        { ClockActions.getState().toString() }
      </div>
    );
  }
};

export default Radium(Clock);
