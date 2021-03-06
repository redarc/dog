import React from 'react';
import axios from 'axios';
import store from '../utils/store';

interface IDogImageState {
  data: any[],
  type: string
}

class DogImage extends React.Component<any, IDogImageState> {

  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      type: ''
    };
  }

  componentDidMount() {
    store.subscribe(() => {
      let state = store.getState();
      console.log(state);
      if(state.type === 'dog-breed') {
        this.getDogImages(state.data, '');
      } else if(state.type === 'dog-subbreed') {
        const breed = state.data.split('/')[0];
        const subbreed = state.data.split('/')[1];
        this.getDogImages(breed, subbreed);
      }
    });
  }

  private getDogImages(breed: string, subbreed: string): void {
    if(!breed) {
      return;
    }

    let url = '/dog/image?breed=' + breed;
    if(subbreed) {
      url = url + '&subbreed=' + subbreed;
    }

    axios.get(url).then(res => {
      console.log(res);
      this.setState((state, props) => ({
        data: res.data.images
      }));
    });
  }

  public render() {
    let dogImages: any[] = [];
    if(this.state.data) {
      dogImages = this.state.data.map((item, index) => {
        return (
          <div className="dog-image-item" key={index}>
            <img src={item} alt="Dog" className="dog-image"/>
          </div>
        )
      });
    }

    return (
      <div className="item-images">
        {dogImages}
      </div>
    );
  }
}

export default DogImage;
