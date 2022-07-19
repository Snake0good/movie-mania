import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Watching from './pages/Watching';
import MovieInfo from './pages/MovieInfo';
import MovieSearch from './pages/MovieSearch';
import TVshowSearch from './pages/TVshowSearch';
import Login from './pages/Login';
import Signup from './pages/Signup';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route index path="/" element={<App />} />
      <Route path='watching' element={<Watching />} />
      <Route path='movieInfo' element={<MovieInfo />} />
      <Route path='movieSearch' element={<MovieSearch />} />
      <Route path='tvSearch' element={<TVshowSearch />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
    </Routes>
  </BrowserRouter>
);