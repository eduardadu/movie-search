import React, { useState } from 'react';
import HomePage from './pages/HomePage.js';
import MoviePage from './pages/MoviePage.js';
import '../styling/output.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import { LikesProvider } from './context/LikesContext.js';

function MovieApp() {
  const [query, setQuery] = useState('');

  return (
    <>
      <LikesProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={<HomePage query={query} setQuery={setQuery} />}
            />
            <Route path="/movie/:id" element={<MoviePage />} />
          </Routes>
        </Router>
      </LikesProvider>
    </>
  );
}

export default MovieApp;
