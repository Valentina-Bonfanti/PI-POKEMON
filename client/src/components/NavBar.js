import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPokemons } from "../actions";
import SearchBar from "./SearchBar";
import styles from "../css/NavBar.module.css"


export default function NavBar({setPage, setInput, setValues}) {

    const dispatch = useDispatch();

    function handleClick(e) {
        e.preventDefault();
        dispatch(getPokemons());//para recargar las recetas
        setPage(1);
        setInput(1);
        setValues({
        sortStrength: "sortByStrength",
        sortAz: "sortByAlphabet",
        filterPoke: "pokemons",
        filterTypes: "types"
      })
      };

    return(
      <div className={styles.container}>
        <nav>
          <div>
            <h1 className={styles.navbar_title}>P O K E A P P</h1>
          </div>
          <div>
             <button className={styles.refresh} onClick={e => {handleClick(e)}}>
                Refresh Pokemons
             </button>
          </div>
          <div>
            <Link to='/createPokemon'>
              <button className={styles.create}>CREATE POKEMON</button> 
            </Link>
          </div>
          <div className={styles.searchBar}>
            <SearchBar setPage={setPage} setInput={setInput}/>
          </div>
    
        </nav>
     </div>
    )

}