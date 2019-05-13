import React, { Component } from 'react';
import DogBread from './components/dog-breed.js';
import DogImage from './components/dog-image.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="main">
         <div className="main-header">HEADER</div>

         <div className="main-body">
            <div className="main-left">left</div>
            <div className="main-center">
              <DogBread />
              <DogImage />
            </div>

            <div className="main-right">right</div>
         </div>

         <div className="main-footer">Bottom</div>
      </div>

    );
  }
}

export default App;
