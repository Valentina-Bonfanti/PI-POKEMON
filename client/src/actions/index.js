import axios from 'axios';

export function getPokemons() {
    return async function(dispatch) {
        try{ var json = await axios.get("/pokemons")
        return dispatch({
            type: "GET_POKEMONS",
            payload: json.data
        })}
        catch(error){
            // window.location.href = "http://localhost:3000/error";
            console.log(error);
        }
    }
}

// export function getPokemons() {
//     return function(dispatch) {
//         axios.get("http://localhost:3001/pokemons")
//         .then(json => {
//             dispatch({
//                 type: "GET_POKEMONS",
//                 payload: json.data
//             })
//         })
//         .catch(error => {
//             console.log(error)
//         }
//         )
//     }
// }

export function getPokeByName(name) {
   return async function(dispatch) {
     try {
        var json = await axios.get(`/pokemons?name=${name}`);
        return dispatch({
            type: "GET_POKE_BY_NAME",
            payload: json.data
        })
     } catch (error) {
        alert('Name do not exists');
     }
   }
}

export function getDetail(id) {
    return async function(dispatch) {
        try {
            var json = await axios.get(`/pokemons/${id}`);
            return dispatch({
                type: "GET_DETAIL",
                payload: json.data
            })
        } catch (error) {
            //alert('pokemon detail do not exist')
           // console.log(error)
           dispatch({
            type: "GET_DETAIL",
            payload: error.data
        })
        }
    }
}

export function removeDetail() {
    return {
      type: "REMOVE_DETAILS",
    };
}

export function setLoading(payload) {
    return{
      type: "SET_LOADING",
      payload
    }
}

export function getTypes() {
    return async function(dispatch) {
        try {
            var json = await axios.get("/types");
            return dispatch({
                type: "GET_TYPES",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function filterCreated(payload) {
  
    return {
      type: "FILTER_CREATED",
      payload,
    };
};
  
export function sortPokemons(payload) {
    // console.log(payload)
    return {
      type: "SORT_POKEMONS",
      payload,
    };
};

export function createPoke(payload) {
    return async function() {
        try {
            const created = await axios.post("/pokemons", payload);
           return created;
        } catch (error) {
            console.log(error);
        }
        
    }
};

