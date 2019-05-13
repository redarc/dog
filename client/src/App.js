import React, { Component } from 'react';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import Home from './components/dog-breed.js';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="main">
         <div className="main-header">HEADER</div>

         <div className="main-body">
            <div className="main-left">left</div>
            <div className="main-center">
              <div className="item-breed">
                <div className="dog-breed">

                  <Route path="/abc" component={Home}/>

                  <select className="dog-breed-select">
                    <option value ="volvo">Volvo</option>
                    <option value ="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
                  </select>
                </div>

                <div className="dog-subbreed">
                  <select className="dog-breed-select">
                    <option value ="volvo">Volvo</option>
                    <option value ="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
                  </select>
                </div>

              </div>

              <div className="item-images">
                <div className="dog-image">
                  <img src="" alt="Dog Image" />
                </div>

                <div className="dog-image">
                  <img src="" alt="Dog Image" />
                </div>

              </div>
            </div>

            <div className="main-right">right</div>
         </div>

         <div className="main-footer">Bottom</div>
      </div>

    );
  }
}

export default App;
