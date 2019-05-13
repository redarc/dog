import React from 'react';
import axios from 'axios';

class Home extends React.Component {

  componentDidMount() {
    axios.get('/api/hello').then(res => {
      console.log(res);
    });
  }

  render() {
    return (
      <h1>hihihihi</h1>
    );
  }
}

export default Home;
