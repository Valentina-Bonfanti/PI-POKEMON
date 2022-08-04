const axios  = require("axios");
const {Pokemon, Type} = require("../db");

//TRAER LA INFO DE LA API Y DB

async function getInfoApi() {
    const pokeRequest1 = await axios.get("https://pokeapi.co/api/v2/pokemon");
    const pokeRequest2 = await axios.get(pokeRequest1.data.next);
    const allRequest = pokeRequest1.data.results.concat(pokeRequest2.data.results);
    const promised = allRequest.map(poke => axios.get(poke.url));
    const info = await Promise.all(promised);
   
    const pokeInfo = await info.map((pokemon) => {
        return {
            id: pokemon.data.id,
            name: pokemon.data.name,
            hp: pokemon.data.stats[0].base_stat,
            attack: pokemon.data.stats[1].base_stat,
            defense: pokemon.data.stats[2].base_stat,
            speed: pokemon.data.stats[5].base_stat,
            height: pokemon.data.height,
            weight: pokemon.data.weight,
            img: pokemon.data.sprites.other.home.front_default,
            types: pokemon.data.types.map(t => {
                return{ 
                    name: t.type.name
                }    
            })

        }
    })

   return pokeInfo;
    
};

async function getDbInfo() {
    const dbInfo = await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }
    })

    return dbInfo;
};

async function getAllPokemons() {
    const infoApi = await getInfoApi();
    const infoDb = await getDbInfo();
    const allPokemons = infoApi.concat(infoDb);

    return allPokemons;
};

//TRAER EL DETALLE DE UN POKE PARTICULAR A TRAVES DEL ID
async function pokeIdApi(id) {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`
    let pokemon = (await axios.get(url)).data;
    
    let pokeInfo = [{
        id: pokemon.id,
        name: pokemon.name,
        hp: pokemon.stats[0].base_stat,
        attack: pokemon.stats[1].base_stat,
        defense: pokemon.stats[2].base_stat,
        speed: pokemon.stats[5].base_stat,
        height: pokemon.height,
        weight: pokemon.weight,
        img: pokemon.sprites.other.home.front_default,
        types: pokemon.types.map(t => {
            return{ 
                name: t.type.name
            }    
        })

    }]
    // console.log(pokeInfo);
    return pokeInfo;
};

async function pokeIdDb(id) {
    const pokemon = await getDbInfo();
    const pokeInfo = pokemon.filter((poke) => poke.id == id);

    return pokeInfo;
};

async function getPokeId(id) {
    let pokeDetail;
    if(id.length < 5){
        pokeDetail = await pokeIdApi(id);
    }else{
        pokeDetail = await pokeIdDb(id);
    }

    return pokeDetail;
}


 
module.exports = {getInfoApi, getDbInfo, getAllPokemons, getPokeId};