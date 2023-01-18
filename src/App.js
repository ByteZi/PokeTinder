import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react';
import types from './components/typeData'

function App() {


  const [pokemon, setPokemon] = useState()

  const rand = () => {
    return Math.floor((Math.random() * 900) + 1)
  }

  const getPoke = (bool) => {

    if (bool){
      axios.post('http://localhost:3001/post',pokemon)
        .then(() => console.log('Success'))
        .catch(err => console.warn(err, "Error"))
    }

    axios.get("https://pokeapi.co/api/v2/pokemon/" + rand())
      .then(res => {
        const pokemon = {
          'id': res.data.id,
          'name': res.data.name,
          'height': res.data.height,
          'weight': res.data.weight,
          'img': res.data.sprites.other.home.front_default,
          'types': [],
          'abilities': []
        }

        for (const i in res.data.types) {
          pokemon['types'].push({
            'type': res.data.types[i].type.name,
            'color': types[res.data.types[i].type.name.toUpperCase()],
          })

        }
        for (const i in res.data.abilities) {
          pokemon['abilities'].push(res.data.abilities[i].ability.name)
        }
        setPokemon(pokemon)

      })
      .catch(err => console.log(err))


  }



  useEffect(() => {
    getPoke();
  }, [])

  return (
    <div className="App">
      <button onClick={() => getPoke(false)}>Left</button>
      <div id="container">

        {
          pokemon ?
            <>
              <img src={pokemon.img} alt="pokemon"></img>
              <h2>ID#{pokemon.id}</h2>
              <h1>{pokemon.name}</h1>
              <h2>HEIGHT : {pokemon.height} m</h2>
              <h2>WEIGHT : {pokemon.weight} lbs</h2>
            </>
            :
            "None"
        }
        <h1>TYPES</h1>
        {
          pokemon ? 
          pokemon.types.map( (i, k) => {
            return (
              <div id="type" key={k}>
                <h3 style={{backgroundColor:i.color}}>{i.type}</h3>
              </div>
            )
          })
          :null
        }
        <h1>ABILITES</h1>
        {
          pokemon ? 
        
          pokemon.abilities.map((i, k) => {
            return(
              <div id="ability" key={k}>
                <h4>{i}</h4>
              </div>
            )
          })
          
          :null
        }


      </div>
      <button onClick={() => getPoke(true)}>Right</button>
    </div>
  );
}

export default App;
