import Radium from 'radium';
import React from 'react';
import * as NewsActions from '../Redux/Modules/NewsReducer';

class News extends React.Component {
  // before the render
  componentWillMount () {
    NewsActions.getNews();
  }

  // after the render
  componentDidMount () {
    this.interval = setInterval(() => {
      if (!NewsActions.getState().get('busy')) {
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
    const news = NewsActions.getState().get('currentNews');
    const formattedNews = news.map(story => {
      return (
        <div>
          <h4 style={{marginBottom: 0}}>{ story.title }</h4>
          <h4 style={{marginTop: 0}}>- { story.source }</h4>
        </div>
      );
    })

    return (
      <div style={{marginTop: 50}}>
        { formattedNews }
        <h3>NEWS</h3>
      </div>
    )
  }
}

export default Radium(News);
