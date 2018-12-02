import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import MenuSidebar from './components/MenuSidebar';
import Main from './components/Main';
import Footer from './components/Footer';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div className="wrapper">
              <MenuSidebar />

              <div className="main-panel">
                <Header />
                <Main />
                <Footer />
              </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
