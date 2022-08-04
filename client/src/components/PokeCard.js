import React from "react";
import { Link } from "react-router-dom";
import styles from '../css/PokeCard.module.css';



export default function PokeCard({id, name, img, types}) {
    return(
        <div className={styles.container}>
          <Link to={`/pokemons/${id}`}>
          <div>
             <div className={styles.imgContainer}>
              <img src={img} className={styles.img} alt="img not found" width="200px" height="250px"/>
             </div>
            <div className={styles.name}>
               <h3>{name}</h3>
             </div>
             <div className={styles.types}>
               <h4>{types}</h4>
             </div>
             <div>
             </div>
          </div>
       </Link>
      </div>
    )
}