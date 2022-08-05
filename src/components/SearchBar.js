import React, { useState } from "react";

const SearchBar = (props) => {
    const [search, setSearch] = useState('')
    const {onSearch} = props
    const handleOnChange = (e) => {
        //e.preventDefault()
        console.log('pokemon: ',e.target.value)
        setSearch(e.target.value)
        if(e.target.value.length === 0) {
            onSearch(undefined) 
        }
    }

    const handleOnClick = () => {
        onSearch(search)
        //console.log('pokemon: ', search)

    }   

    return (
        <div className="searchbar-container">
            <div className="searchbar">
                <input placeholder="Buscar pokemon" onChange={handleOnChange}/>
            </div>
            <div className="searchbar-btn">
                <button onClick={handleOnClick}>Buscar</button>
            </div>
        </div>
    );
}

export default SearchBar;