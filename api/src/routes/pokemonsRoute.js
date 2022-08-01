const { Router } = require("express");
const {getPokeByName, getAllPokemons, getPokeId} = require("../controllers/controllers");
const {Pokemon , Type} = require("../db");

const pokeRouter = Router();

pokeRouter.get('/', async (req,res) => {
   const {name} = req.query;
   const allPokemons = await getAllPokemons();
  //const nameLower = name.toLowerCase();


    try {
        if(name) {
            const pokeName = await allPokemons.filter((poke) => poke.name.toLowerCase().includes(name.toLowerCase()));
        //    const nameLower = name.toLowerCase();
        //    const pokeName = await getPokeByName(nameLower);

            pokeName.length > 0
            ? res.status(200).send(pokeName)
            : res.status(404).send('NOT FOUND')
        }else{
            // const allPokes = await getAllPokemons();

            // allPokes.length > 0
             res.status(200).send(allPokemons)
            // : res.status(404).send('NOT FOUND')
        }
        
    } catch (error) {
        console.log(error);
    }

})

pokeRouter.get('/:id', async (req,res) => {
    const {id} = req.params;
    const pokeDetail = await getPokeId(id);
    try {
        pokeDetail.length > 0 
        ? res.status(200).send(pokeDetail)
        : res.status(404).send('POKEMON NOT FOUND')
    } catch (error) {
        res.status(404).send('POKEMON NOT FOUND')
    }
})

pokeRouter.post('/', async (req,res) => {
    const { name, img, types,hp, attack, defense, speed, height, weight } = req.body;
    
    try {
        const pokemon = await Pokemon.create({
            name,
            hp,
            attack,
            defense,
            speed,
            height, 
            weight,
            img
        });

        const typeDb = await Type.findAll({
            where: {
                name: types
            }
        });
       console.log(typeDb);
        pokemon.addType(typeDb);
        
        res.status(201).send(pokemon);

    } catch (error) {
        console.log(error);
    }
})

module.exports = pokeRouter;