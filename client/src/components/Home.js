import React, {useState} from 'react';
import {  useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getPokemons, getTypes, filterCreated, sortPokemons, removeDetail, setLoading } from '../actions';
import NavBar from './NavBar';
import PokeCard from './PokeCard';
import Pagination from './Pagination';
import styles from '../css/Home.module.css';
import { Loading } from './Loading';
import Error from "./Error";

export default function Home() {

    const dispatch = useDispatch(); //para usar esta cte e ir dispatcheando mis actions
    const allPokemons = useSelector((state) => state.pokemons); // es como hacer el mapStateToProps.
    const types = useSelector((state) => state.types);
    //console.log(types);
    const loading = useSelector((state) => state.loading);
    //const [reloadState, setReloadState] = useState(false);
    const [values, setValues] = useState({
      sortStrength: "sortByStrength",
      sortAz: "sortByAlphabet",
      filterPoke: "pokemons",
      filterTypes: "types"
    });

      //------------PAGINADO-------------
      const [page, setPage] = useState(1);
      const [forPage] = useState(12);//cant de pokemons q quiero poner por pag.
      const [input, setInput] = useState(1)
      const max = Math.ceil(allPokemons.length / forPage); //4

    useEffect(() => {
        dispatch(getPokemons())  //me traigo los pokemons del estado cuando se monta
        dispatch(getTypes())
        return () => {
          dispatch(removeDetail());
          dispatch(setLoading());
        }
     },[dispatch]);

     function handleFilter(e) {
      e.preventDefault();
      dispatch(filterCreated(e.target.value));
      //setReloadState((prev) => !prev);
      setPage(1);
      setInput(1);
      setValues({...values,[e.target.name]: e.target.value})
     }

     function handleSort(e) {
      e.preventDefault();
      dispatch(sortPokemons(e.target.value));
      //setReloadState((prev) => !prev);
      setPage(1);
      setInput(1);
      setValues({...values,[e.target.name]: e.target.value})
     }

    return(
       <div className={styles.container}>
        <div>
            <NavBar setPage={setPage} setInput={setInput} setValues={setValues}/>
          </div>
         <div className={styles.selects}>
           <select className={styles.select_01} value={values.sortAz} name="sortAz" onChange={(e) => handleSort(e) }>
             <option value="sortByAlphabet"  disabled >Sort By Alphabet</option>
             <option value="a-z">A-Z</option>
             <option value="z-a">Z-A</option>
           </select>

          <select className={styles.select_02} value={values.sortStrength} name="sortStrength" onChange={(e) => handleSort(e) }>
            <option value="sortByStrength" disabled>Sort By Strength </option>
            <option value="strong"> Strong </option>
            <option value="weak"> Weak</option>
          </select>

          <select className={styles.select_03} value={values.filterPoke} name="filterPoke" onChange={e => handleFilter(e)}>
            <option value="pokemons" disabled> Pokemons </option>
            <option value="all"> ALL </option>
            <option value="api"> API </option>
            <option value="created"> CREATED </option>
          </select>

          <select className={styles.select_04} value={values.filterTypes} name="filterTypes" onChange={e => handleFilter(e)}>
           <option value="types" disabled>Types</option>
           <option value="all">All</option>
       
          {
               types?.map((t) => (
                <option value={t.name}>
                  {t.name}
                </option>
               ))
          }
      
          </select>
     </div>

         {
          !loading
          ? (allPokemons.length > 0 
              ? (<div>
          
                 <div className={styles.cardContainer}>
           {
            allPokemons && allPokemons
           .slice((page - 1) * forPage, (page - 1) * forPage + forPage)
           .map((poke) => 
            {
                return (
                <div key={poke.id}>
                <PokeCard
                name={poke.name}
                img={poke.img}
                types={poke.types.map(t => t.name).join(" - ")}
                id={poke.id}
                
                />
                </div>
                )
            })
            
      }
         </div>
         <Pagination
          page={page}
          setPage={setPage}
          pokemonsPerPage={max}
          input={input}
          setInput={setInput}/>
       </div>)
         : <Error />)
       : (<div>
           <Loading/>
          </div>)} 

     
  </div>
    )
}