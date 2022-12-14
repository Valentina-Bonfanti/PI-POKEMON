import { filterPokemons, sortPokemons } from "./utils";

const initialState = {
    pokemons: [],
    allPokemons: [],//copia
    loading: true,
    detail: [],
    types: []
}

function rootReducer(state = initialState, action){
    switch(action.type) {
        case "GET_POKEMONS":
            return{
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload,
                loading: false
            };
        case "GET_POKE_BY_NAME":
            return{
              ...state,
              pokemons: action.payload,
              
            };
        case "SET_LOADING":
            if(action.payload === false) {
                return{
                    ...state,
                    loading: false
                }
            }
            else return{
                ...state,
                loading: true
        };
        case "GET_DETAIL":
            return{
             ...state,
            detail: action.payload,
            loading: false
        }; 
        case "REMOVE_DETAILS":
            return {
              ...state,
              pokemons: [],
              detail: [],
        };
        case "GET_TYPES":
            return{
                ...state,
                types: action.payload 
        };
        case "FILTER_CREATED":
        //let pokemonsFilter = [...state.allPokemons]
        //console.log(action.payload)
        let filtered = filterPokemons(action.payload, state.allPokemons)
       
           return{
                ...state,
                pokemons: filtered,
            };
        case "SORT_POKEMONS":
           //let pokemonsAz = [...state.pokemons]
        
         return {
                ...state,
                pokemons: sortPokemons(action.payload, state.pokemons),
                };         
        default:
            return state;    
    }
}

export default rootReducer;