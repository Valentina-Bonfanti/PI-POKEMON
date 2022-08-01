import React  from "react";
import styles from '../css/Pagination.module.css';



export default function Pagination({page, setPage, pokemonsPerPage, input,setInput }){


    function nextPage(){
        setInput (input + 1)
        setPage (page + 1);
    }
    
    function previousPage(){
        setInput (input - 1)
        setPage (page - 1);
    }
    

    return(
       <div className={styles.container}>
            <button className={styles.btn} disabled={page === 1 || page < 1} onClick={previousPage}>⇠</button>
            <div className={styles.textContainer}>
            <input className={styles.input} name='page' autoComplete="off" type="text" value={input}/>
            <p className={styles.text}> of {pokemonsPerPage}</p>
            </div>
            <button className={styles.btn} disabled={ page > pokemonsPerPage || page === pokemonsPerPage } onClick={nextPage}>⇢</button>
        </div>
    )
}