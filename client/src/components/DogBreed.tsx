import React from 'react';
import axios from 'axios';
import store from '../utils/store';

interface IDogBreedState {
  data: any[],
  subData: any[],
  selectedBreed: string,
  selectedSubbreed: string,
}

class DogBreed extends React.Component<any, IDogBreedState> {
  constructor(props: any) {
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
      if(res.data instanceof Array) {
        this.setState((state, props) => ({
          data: res.data
        }));
      }
    });
  }

  public selectBreed(e: any): void {
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

  public selectSubbreed(e: any): any {
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

  public render() {
    let breeds: any[] = [];
    let subbreeds: any[] = [];

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
            <option style={{display: 'none'}}></option>
            {breeds}
          </select>
        </div>

        <div className="dog-subbreed">
          <select className="dog-breed-select" value={this.state.selectedSubbreed} onChange={this.selectSubbreed.bind(this)}>
            <option style={{display: 'none'}}></option>
            {subbreeds}
          </select>
        </div>
      </div>

    );
  }
}

export default DogBreed;
