import { useEffect, useState } from 'react';
import { getPokemonData, getPokemons, searchPokemon } from './api';
import './App.css';
import Navbar from './components/Navbar';
import Pokedex from './components/Pokedex';
import SearchBar from './components/SearchBar';
import { FavoriteProvider } from './contexts/favoritesContext';
function App() {

  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itensPerPage = 25;
  const [favorites, setFavorites] = useState([]);
  const favoritesKey = 'f';

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      setNotFound(false);
      const data = await getPokemons(itensPerPage, itensPerPage * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url)
      });
      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
      setTotalPages(Math.ceil(data.count / itensPerPage))
    } catch (error) {
      console.error("fetchPokemons error: ",error);
    }
  }

  const loadFavoritePokemons = ()  => {
    const pokemons = JSON.parse(window.localStorage.getItem(favoritesKey)) || []
    setFavorites(pokemons);
  };

  useEffect(() => {
    loadFavoritePokemons()
  }, []);

  useEffect(() => {
    fetchPokemons()
  }, [page]);

  const updateFavoritePokemons = (name) => {
    const updateFavorites = [...favorites]
    const favoriteIndex = favorites.indexOf(name)
    if(favoriteIndex >= 0) {
      updateFavorites.splice(favoriteIndex, 1);
    } else {
      updateFavorites.push(name);
    }
    window.localStorage.setItem(favoritesKey, JSON.stringify(updateFavorites));
    setFavorites(updateFavorites);
  }

  const handleOnSearch = async (pokemon) => {
    if(!pokemon) {
      return fetchPokemons();
    }
    setLoading(true);
    setNotFound(false);
    const result = await searchPokemon(pokemon);
    if(!result) {
      setNotFound(true);
    } else {
      setPokemons([result])
      setPage(0)
      setTotalPages(1)
    }
    setLoading(false);
  }

  return (
    <FavoriteProvider
      value={{favoritePokemons: favorites, updateFavoritePokemons: updateFavoritePokemons}}
    >
      <div>
        <Navbar />
        <SearchBar onSearch={handleOnSearch}/>
        {notFound ? (
          <div className='not-found-text'>Pokemon não existe</div>  
        ) :
          <Pokedex pokemons={pokemons} loading={loading} page={page} totalPages={totalPages} setPage={setPage}/>
        }
      </div>
    </FavoriteProvider>
  );
}

export default App;
