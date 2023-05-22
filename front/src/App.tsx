import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './components/user/register';
import Login from './components/user/login';
import Home from './components/home';
import { Provider } from 'react-redux';
import { store } from './lib/redux/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" 
              element={
                  <Register/> 
              } 
            />
            <Route path="/login" 
              element={
                  <Login/>
              } 
            />
            <Route path="/home" 
              element={
                  <Home/>
              } 
            />
          </Routes>
        </Router>
      </Provider>
      
    </div>
  );
}

export default App;
