import React from 'react';
import Clock from '../components/Clock';
import Weather from '../components/Weather';
import News from '../components/News';

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { props } = this;
    return (
      <div>
        <div>
          <Clock {...props}/>
        </div>
        <div style={{width:500}}>
          <Weather {...props}/>
          <News {...props}/>
        </div>
      </div>
    );
  }
}

export default HomeContainer;
