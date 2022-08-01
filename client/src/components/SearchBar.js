import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokeByName } from "../actions";
import styles from '../css/SearchBar.module.css';


export default function SearchBar({setInput, setPage}) {
    const dispatch = useDispatch();
    const [pokemon, setPokemon] = useState("");

 function handleChange(e) {
    
    setPokemon(e.target.value)//el valor del input.
 }

 function handleClick(e) {
    
    if(pokemon){
        dispatch(getPokeByName(pokemon));
        setPokemon("");
    }else{
        alert ("Insert a Pokemon name")
    }
    setPage(1);
    setInput(1);
 }

    return(
        <div className={styles.container}>
            <input className={styles.input} type="text" value={pokemon} placeholder="Search..." onChange={e => handleChange(e)}/>
            <button className={styles.btn} type="button" onClick={e => handleClick(e)}>
                Search
            </button>
        </div>
    )
}