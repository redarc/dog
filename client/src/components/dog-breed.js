import React from 'react';
import axios from 'axios';

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
    this.setState({
      selectedBreed: e.target.value
    });

    if(this.state.data && e.target.value) {
      this.state.data.map(item => {
        if(item.breed === e.target.value) {
          this.setState({
            subData: item.subbreed
          })
        }
      })
    } else {
      this.setState({
        subData: []
      })
    }
  }

  selectSubbreed(e) {
    console.log('-- selectSubbreed');
    console.log(e);
    this.setState({
      selectedSubbreed: e.target.value
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
