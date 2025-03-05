import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios, { all } from "axios";

//TODO: make team generation random, add caption to each image instead of just last image

function App() {

  // list of pokemon = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0'
  const fetchPokemonList = async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0");
      let results = response.data.results; // API returns an array in `results`
      const pokemonNames = results.map(pokemon => pokemon.name);
      return pokemonNames;
    } catch (err) {
      console.log(err);
    }
  };
  //fetchPokemonList();

  // get random pokemon
  const getRandomPoke = async () => {
    const pokemonNames = await fetchPokemonList();
    const randomNum = Math.floor(Math.random()*101);
    let randomPoke = pokemonNames[randomNum];
    //console.log(randomPoke)
    return randomPoke;
  };
  //getRandomPoke();

  // display image
  let lastUsed = '';

  const getPokemonImage = async(evt) => {
    evt.preventDefault();
    let randPoke = await getRandomPoke();
    let pokeHtml = document.getElementById('user-poke');
    let captionHtml = document.getElementById('caption-user');

    try {
      // get image url, paste image, and return poke types
      let requestUrl = `https://pokeapi.co/api/v2/pokemon/${randPoke}`;
      let { data } = await axios.get(requestUrl); // returns an obj with the key of data
      // poke url to image
      let myPokemon = data.sprites.front_default;
      const pokemonTypes = data.types.map(typeInfo => typeInfo.type.name);

      // create image and display
      let imgElement = document.createElement('img');
      imgElement.src = myPokemon;
      pokeHtml.appendChild(imgElement);
      captionHtml.innerHTML = `name: ${randPoke}, type: ${pokemonTypes}`;

      lastUsed = randPoke;

    } catch (err) {
      console.log(err);
    }
  };

  const getPokeType = async (last) => {
    try {
      // get url return poke types
      let requestUrl = `https://pokeapi.co/api/v2/pokemon/${last}`;
      let { data } = await axios.get(requestUrl); // returns an obj with the key of data
      // poke types from data obj
      const pokemonTypes = data.types.map(typeInfo => typeInfo.type.name);
      return pokemonTypes

    } catch (err) {
      console.log(err);
    }
  };

  // list of all other pokemon with that type
  const getTypeList = async (typeName) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/type/${typeName}`);
      return response.data.pokemon.map(pokemon => pokemon.pokemon.name); // get names
    } catch (err) {
      console.log(err);
    }
  };

  // find matching types
  const findSimilar = async () => {
    const types = await getPokeType(lastUsed);

    if (types.length === 0) {
      console.log("No types found.");
      return;
    }
    for (const type of types) {
      const sameTypePokemon = await getTypeList(type);
      return sameTypePokemon;
    }
  };

  // add to theme team
  let count = 0;

  const createTeam = async (evt) => {
    evt.preventDefault();

    let teamHtml = document.getElementById('poke-team');
    let captHtml = document.getElementById('caption-team');
    const typeArray = await findSimilar();
    let teamPokeName = typeArray[count]
    count++;

    // skip matching
    if (teamPokeName === lastUsed) {
      teamPokeName = typeArray[count];
    }

    
    try {
      // get image url, paste image, and return poke types
      let requestUrl = `https://pokeapi.co/api/v2/pokemon/${teamPokeName}`;
      let { data } = await axios.get(requestUrl); // returns an obj with the key of data
      // poke url to image
      let myPokemon = data.sprites.front_default;

      // create image and display
      let imgElement = document.createElement('img');
      imgElement.src = myPokemon;
      teamHtml.appendChild(imgElement);
      captHtml.innerHTML = `name: ${teamPokeName}`;

    } catch (err) {
      console.log(err);
    }

  };


  return (
    <>
      <h1>Pokemon Theme Team</h1>
      <p id='user-poke'></p>
      <p id='caption-user'></p>
      <p id='poke-team'></p>
      <p id='caption-team'></p>
      <form onSubmit={(event)=>getPokemonImage(event)}>
        <input id='user-submit' type="submit" value='Get Pokemon' />
      </form>
      <form onSubmit={(event)=>createTeam(event)}>
        <input id='user-team' type="submit" value='Create Team Member' />
      </form>
    </>
  )
}

export default App

// enter name to get poke pic

// const getPokemon = async(evt) => {
//   evt.preventDefault();
//   let userSubmitField = document.getElementById('user-submit');
//   let pokeName = userSubmitField.value;
//   let userPoke = document.getElementById('user-poke');

//   try {
//     // get image url
//     let requestUrl = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
//     let { data } = await axios.get(requestUrl); // returns an obj with the key of data
//     let myPokemon = data.sprites.front_default;
//     console.log(myPokemon);

//     // create image and display
//     let imgElement = document.createElement('img');
//     imgElement.src = myPokemon;
//     userPoke.appendChild(imgElement);
//     userSubmitField.value = ''; // clear input

//   } catch (err) {
//     console.log(err);
//   }
// };


// return (
//   <>
//     <h1>Pokemon Theme Team</h1>
//     <p id='user-poke'></p>
//     <form onSubmit={(event)=>getPokemon(event)}>
//       <input id='user-submit' type='text' name='user-sub' placeholder='enter pokemon'/>
//       <input type="submit" />
//     </form>
//   </>
// )
// }
