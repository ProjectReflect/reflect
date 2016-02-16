import Radium from 'radium';
import React from 'react';
import * as WeatherActions from '../Redux/Modules/WeatherReducer';

class Weather extends React.Component {
  // before the render
  componentWillMount () {
    WeatherActions.getWeather()
  }
  // after the render
  componentDidMount () {
    this.interval = setInterval(() => {
      if (!WeatherActions.getState().get('busy')) {
        this.forceUpdate();
        clearInterval(this.interval);
      }
    }, 1)
  }
  // leave
  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render() {
    const curWeather = WeatherActions.getState().get('currentWeather');
    const curTemp = curWeather.get('curTemp');
    const condition = curWeather.get('condition');
    const loc = curWeather.get('loc');
    const degreeType = curWeather.get('degreeType');

    return (
      <div>
        <h2 style={styles.text}>{ curTemp }°{ degreeType }</h2><h3 style={styles.text}> {condition}</h3>
        <h3>WEATHER [{loc}]</h3>
      </div>
    );
  }
};

const styles = {
  text: {
    display: 'inline',
  },
};


export default Radium(Weather);
