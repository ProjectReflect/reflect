import React from 'react';
import Clock from '../components/Clock';

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { props } = this;
    return (
      <div>
        <Clock {...props}/>
      </div>
    );
  }
}

export default HomeContainer;
