
export function filterPokemons(filterBy, array) {
  
  switch (filterBy) {

      case "all":
        return array;
  
      case "api":
        array = array.filter((poke) => poke.createdInDb === undefined);
       
        return array;
  
      case "created":
        array = array.filter((poke) => poke.createdInDb === true);
        
        return array;
  
      case filterBy:
        array = array.filter((poke) =>
        poke.types.find((t) => t.name === filterBy)
        );
      
        return array;

     
  
      default:
        return array;
    }
  };
  
  export function sortPokemons(sortBy, array) {
    switch (sortBy) {
      case "a-z":
        
        return array.sort((a,b) => {
          if(a.name > b.name) return 1;
          if(b.name > a.name) return -1;
          return 0;
        })
      case "z-a":
       
        return array.sort((a,b) => {
          if(a.name > b.name) return -1;
          if(b.name > a.name) return 1;
          return 0;
        })
      case "strong":
        return array.sort((a, b) => {
          if (a.attack < b.attack) return 1;
          if (a.attack > b.attack) return -1;
          return 0;
        });
      case "weak":
        return array.sort((a, b) => {
          if (a.attack > b.attack) return 1;
          if (a.attack < b.attack) return -1;
          return 0;
        });
      default:
        return array;
    }
  };