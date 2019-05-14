import React from 'react';
import DogBreed from './components/DogBreed';
import DogImage from './components/DogImage';
import './App.css';

const App: React.FC = () => {
  return (
   <div className="main">
       <div className="main-header">HEADER</div>

       <div className="main-body">
         <div className="main-content">
           <DogBreed />
           <DogImage />
         </div>
          <div className="main-left">left</div>
          <div className="main-right">right</div>
       </div>

       <div className="main-footer">Bottom</div>
    </div>
  );
}

export default App;
