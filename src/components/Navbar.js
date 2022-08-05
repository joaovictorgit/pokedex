import React, {useContext} from 'react';
import FavoriteContext from '../contexts/favoritesContext';
//import { ThemeContext, themes } from '../contexts/Theme';
//import ToggleDark from './ToggleDark';
const Navbar = () => {
    const {favoritePokemons} = useContext(FavoriteContext);
    const logo = 'https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png';
    //const [darkMode, setDarkMode] = useState(true);
    return (
        <nav>
            <div>
                <img alt='pokeapi-logo' src={logo} className='navbar-img'/>
            </div>
            <div className='favorites-container'>{favoritePokemons.length}❤️</div>
            {/*<div>
                <ThemeContext.Consumer>
                    {({ changeTheme }) => (
                        <ToggleDark
                            toggleDark={() => {
                            setDarkMode(!darkMode);
                            changeTheme(darkMode ? themes.light : themes.dark);
                            }}
                        />
                    )}
                </ThemeContext.Consumer>
            </div>*/}
        </nav>
    );
}

export default Navbar;