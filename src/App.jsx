import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";


// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

function App() {

  const getPokemon = async(evt) => {
    evt.preventDefault();
    let userSubmit = document.getElementById('user-submit');
    let userPoke = document.getElementById('user-poke');

    try {
      let requestUrl = "https://pokeapi.co/api/v2/pokemon/ditto";
      let { data } = await axios.get(requestUrl); // returns an obj with the key of data
      let myPokemon = data.sprites.front_default;
      console.log(myPokemon);

      let imgElement = document.createElement('img');
      imgElement.src = myPokemon;
      userPoke.appendChild(imgElement);

    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
      <h1>Pokemon Theme Team</h1>
      <p id='user-poke'></p>
      <form onSubmit={(event)=>getPokemon(event)}>
        <input id='user-submit' type='text' name='user-sub' placeholder='enter pokemon'/>
        <input type="submit" />
      </form>
    </>
  )
}

export default App
