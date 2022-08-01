import React, { useEffect, useState } from "react";
import { getTypes, createPoke, getPokemons} from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styles from '../css/CreatePoke.module.css';




export default function CreatePoke(){
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const pokemons = useSelector((state) => state.pokemons).map(p => p.name);
  const history = useHistory();

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getPokemons());
  }, [dispatch]);

  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: null,
    speed: null,
    height: null,
    weight: null,
    types: [],
    img: "",
  });

  function validate(input) {
    let errors = {};

    if(pokemons.includes(input.name.toLowerCase())) {
       errors.name = "The pokemon already exists, use another name";
    }

    if (!input.name) {
      errors.name = "Name is required";
     } else if (!/^[a-zA-Z]+$/.test(input.name) || input.name.length > 10 || input.name.length < 3 ) {
      errors.name = "Name is invalid";
    }
    // !/^\d+$/.test(input.hp) 
    if(!input.hp) {
        errors.hp = "Hp is required"
    } else if( parseInt(input.hp) > 200 || parseInt(input.hp) < 1) {
        errors.hp = "Hp invalid";
    }
    
    if(!input.attack) {
        errors.attack = "Attack is required"
    }else if(parseInt(input.attack) > 250 || parseInt(input.attack) < 1) {
        errors.attack = "Attack invalid";
    }

    if (!input.img) {
      errors.img = "URL is required";
     } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(input.img)){
      errors.img = "URL is invalid, just png/jpg format";
    }

    return errors;
}

function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
};

function handleSelect(e) {
    if (input.types.includes(e.target.value)) {
        alert("Already has that type");
      } else {
        if (input.types.length < 2) {
          setInput({
            ...input,
            types: [...input.types, e.target.value],
          });
          e.target.value = "Select type";
        } else {
          alert("You can only choose two types");
          e.target.value = "Select type";
        }
      }
};

function handleDelete(e) {
    setInput({
        ...input,
        types: input.types.filter((type) => type !== e),
      });
}

function handleSubmit(e) {
    e.preventDefault();
    if(Object.keys(errors).length === 0 && input.types.length > 0) {
     dispatch(createPoke(input));
     alert("POKE CREATED SUCCESFULLY");
     setInput({
        name: "",
        hp: "",
        attack: "",
        defense: null,
        speed: null,
        height: null,
        weight: null,
        types: [],
        img: "",
      });
      history.push('/home');
    } else {
        if (input.types.length <= 0) {
          alert("Types missing");
        } else {
          alert("Please complete obligatoty items");
        }
    }
}

  return (
    <div className={styles.container} >
     
      <div>
        <div>
          <form onSubmit={e => handleSubmit(e)}>
          <div className={styles.title}>
              <h2>CREATE YOUR OWN POKEMON!</h2>
            </div>
            <div className={styles.inputContainer}>
              <div >
                <input
                className={styles.input}
                  type="text"
                  value={input.name}
                  name="name"
                  placeholder=" Name*"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <p>{errors.name}</p>

                <input
                 className={styles.input}
                  type="number"
                  value={input.hp}
                  name="hp"
                  placeholder=" HP*"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <p>{errors.hp}</p>

                <input
                 className={styles.input}
                  type="number"
                  value={input.attack}
                  name="attack"
                  placeholder=" Attack*"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <p>{errors.attack}</p>

                <input
                 className={styles.input}
                  type="number"
                  value={input.defense}
                  name="defense"
                  placeholder=" Defense"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <p>{errors.defense}</p>
              </div>
              <div>
                <input
                 className={styles.input}
                  type="number"
                  value={input.speed}
                  name="speed"
                  placeholder=" Speed"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <p>{errors.speed}</p>

                <input
                 className={styles.input}
                  type="number"
                  value={input.height}
                  name="height"
                  placeholder=" Height"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <p>{errors.height}</p>

                <input
                 className={styles.input}
                  type="number"
                  value={input.weight}
                  name="weight"
                  placeholder=" Weight"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <p>{errors.weight}</p>

                <input
                 className={styles.input}
                  type="text"
                  value={input.img}
                  name="img"
                  placeholder=" URL Image...*"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <p>{errors.img}</p>
              </div>
            </div>
            <div className={styles.types}>
              <div className={styles.selects}>
                <select className={styles.select} onChange={e => handleSelect(e)}>
                  <option>Select type</option>
                  {types?.map((t) => {
                    return (
                      <option key={t.id} value={t.name}>
                        {t.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className={styles.box}>
                {input.types.map((t) => {
                  return (
                    <div className={styles.selected}  key={t}>
                      <p className={styles.pBox}>{t}</p>
                      <button 
                         onClick={() => {
                          handleDelete(t);
                        }}>
                        x
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            {!input.name || errors.name || errors.hp || errors.img
            ? (
              <button className={styles.btndisabled} disabled type="submit">
                Create!
              </button>
            ) : (
              <button className={styles.btn}>
                Create!
              </button>
            )}
          </form>
        </div>
        <div >
          <Link to="/home">
           <span className={styles.back}>
             BACK
           </span>
         </Link>
        </div>
      </div>
    </div>
  );
};

