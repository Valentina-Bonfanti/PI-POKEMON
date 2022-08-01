import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import PokeDetail from './components/PokeDetail';
import CreatePoke from './components/CreatePoke';
import Error from './components/Error';

function App() {
  return (
    <BrowserRouter>
     <div className="App">
       <Route exact path='/' component={LandingPage}/> 
       <Route path='/home' component={Home}/>
       <Route path='/pokemons/:id' component={PokeDetail}/>
       <Route path='/createPokemon' component={CreatePoke}/>
       {/* <Route path='/error' component={Error}/> */}
     </div>
    </BrowserRouter>
  );
}

export default App;
