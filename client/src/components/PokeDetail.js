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
           <div className={styles.info}>
             <div className={styles.infoContainer}>
              <div>
              <h3>HP:</h3>
              <p> {pokemon[0].hp}</p>
              </div>
              <div>
              <h3>Types:</h3>
              <p> {pokemon[0].types.map(t => t.name).join(" - ")}</p>
              </div>
              <div>
              <h3>Attack:</h3>
              <p> {pokemon[0].attack}</p>
              </div>
              </div>
              <div className={styles.infoContainer2}>
              {
                pokemon[0].defense && 
                <div>
                <h3>Defense:</h3>
                <p>{pokemon[0].defense}</p>
                </div>
              }
               {
                pokemon[0].speed && 
                <div>
                <h3>Speed:</h3>
                <p> {pokemon[0].speed}</p>
                </div>
              }
               {
                pokemon[0].weight && 
                <div>
                <h3>Weight:</h3>
                <p> {pokemon[0].weight}</p>
                </div>
              }
               {
                pokemon[0].height && 
                <div>
                <h3>Height: </h3>
                <p>{pokemon[0].height}</p>
                </div>
              }
              </div>
           </div>

              <h3 className={styles.id}>POKENUMBER: {pokemon[0].id}</h3> 

            
            
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