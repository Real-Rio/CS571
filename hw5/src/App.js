
import './App.css';
import BadgerBeatsFavoritesContext from "./contexts/BadgerBeatsFavoritesContext";
import AboutUs from './components/Home';
import AllSongs from './components/AllSongs';
import BadgerBeats from './components/BadgerBeats';
import FavoriteSongs from './components/FavoriteSongs';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import NoMatch from './components/NoMatch';
import { useState } from 'react';

function App() {
  const [favorites, setFavorites] = useState([]);


  return (
    <BadgerBeatsFavoritesContext.Provider value={[favorites, setFavorites]} >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BadgerBeats />}>
            <Route index element={<AboutUs />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="songs" element={<AllSongs />} />
            <Route path="favorites" element={<FavoriteSongs />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BadgerBeatsFavoritesContext.Provider >
  )
}

export default App;
