const { default: axios } = require("axios");
const { Router } = require("express");
const {Type} = require("../db");

const typeRouter = Router();

typeRouter.get('/', async (req,res) => {

    try {
        let apiTypes = await axios.get('https://pokeapi.co/api/v2/type');
        let apiTypeData = apiTypes.data;
        let types = apiTypeData.results.map((type) =>  ({name: type.name}));
       
        // console.log(types);
        types.forEach((type) => {
            Type.findOrCreate({
                where: {
                    name: type.name
                }
            })
        });

        const allTypes = await Type.findAll();

        return res.status(200).send(allTypes);
    
    } catch (error) {
        console.log(error)
    }

})



module.exports = typeRouter;