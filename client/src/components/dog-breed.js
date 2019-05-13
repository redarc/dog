import React from 'react';
import axios from 'axios';
import store from '../utils/store.js';

class DogBread extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      subData: [],
      selectedBreed: '',
      selectedSubbreed: '',
    };
  }

  componentDidMount() {
    axios.get('/dog/breeds').then(res => {
      console.log(res);
      this.setState((state, props) => ({
        data: res.data
      }));
    });
  }

  selectBreed(e) {
    console.log('-- selectbreed');
    console.log(e.target.value);
    if(!e.target.value) {
      return;
    }
    const targetValue = e.target.value;

    this.setState({
      selectedBreed: targetValue
    });

    if(this.state.data) {
      this.state.data.map(item => {
        if(item.breed === targetValue) {
          this.setState({
            subData: item.subbreed
          })
        }
        return true;
      })
    } else {
      this.setState({
        subData: []
      })
    }

    store.dispatch({
      type: 'dog-breed',
      data: targetValue
    });
  }

  selectSubbreed(e) {
    console.log('-- selectSubbreed');
    console.log(e);
    if(!e.target.value) {
      return;
    }

    const targetValue = e.target.value;
    this.setState({
      selectedSubbreed: targetValue
    });

    store.dispatch({
      type: 'dog-subbreed',
      data: this.state.selectedBreed + '/' + targetValue
    });
  }

  render() {
    console.log('--- render --');
    let breeds = '';
    let subbreeds = '';

    if(this.state.data) {
      breeds = this.state.data.map((item, index) => {
        return <option key={index} value={item.breed}>{item.breed}</option>
      });
    }

    if(this.state.subData) {
      subbreeds = this.state.subData.map((item, index) => {
        return <option key={index} value={item}>{item}</option>
      });
    }

    return (
      <div className="item-breed">
        <div className="dog-breed">
          <select className="dog-breed-select" value={this.state.selectedBreed} onChange={this.selectBreed.bind(this)}>
            {breeds}
          </select>
        </div>

        <div className="dog-subbreed">
          <select className="dog-breed-select" value={this.state.selectedSubbreed} onChange={this.selectSubbreed.bind(this)}>
            {subbreeds}
          </select>
        </div>
      </div>

    );
  }
}

export default DogBread;
