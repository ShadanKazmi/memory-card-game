import { Route, Routes } from 'react-router-dom';
import { getCards } from './API/CardsAPI';
import './App.css';
import MenuScreen from './Components/MenuScreen';
import PlayScreen from './Components/PlayScreen';

function App() {
  return (
    
    <div >
      <Routes>
        <Route path = "/" element = {<MenuScreen/>}/>
        <Route path = "/gamescreen" element = {<PlayScreen/>}/>
      </Routes>
    </div>
  );
}

export default App;
