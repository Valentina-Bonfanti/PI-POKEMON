import React from "react";
import { getDetail, removeDetail, setLoading } from "../actions";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Loading } from "./Loading";
import Error from "./Error";
import styles from "../css/PokeDetail.module.css";


export default function PokeDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const loading = useSelector((state) => state.loading)

    useEffect(() => {
        dispatch(getDetail(id))
        return () =>{
          dispatch(removeDetail()); //para cuando se desmonta el detail, q no quede cargada la info de la receta anterior.
         dispatch(setLoading())
         }
    }, []);



    const pokemon = useSelector(state => state.detail);
    console.log(pokemon);

    return(
        <div>
        {
           
          !loading
            ?( pokemon && pokemon.length > 0
            ?  
            (<div className={styles.container}> 
          
              <h2 className={styles.name}>{pokemon[0].name}</h2>
              <img className={styles.img} src={pokemon[0].img} alt="img not found" height="350px" width="300px" />
           
             <div className={styles.infoContainer}>
              <h3>HP: {pokemon[0].hp}</h3>
              <h3>Types: {pokemon[0].types.map(t => t.name).join(", ")}</h3>
              <h3>Attack: {pokemon[0].attack}</h3>
              </div>
              <div className={styles.infoContainer2}>
              {
                pokemon[0].defense && 
                <h3>Defense: {pokemon[0].defense}</h3>
              }
               {
                pokemon[0].speed && 
                <h3>Speed: {pokemon[0].speed}</h3>
              }
               {
                pokemon[0].weight && 
                <h3>Weight: {pokemon[0].weight}</h3>
              }
               {
                pokemon[0].height && 
                <h3>Height: {pokemon[0].height}</h3>
              }
              </div>
           

              <h3 className={styles.id}>ID: {pokemon[0].id}</h3> 
            
              <Link to='/home'>
                <button className={styles.btn}>BACK</button>
              </Link>
            </div>)
            : <div className={styles.error}>
            <Error/>
            </div>
            )

           :(<div>
            <Loading/>
           </div>)
        }
        

        </div>
    )

}