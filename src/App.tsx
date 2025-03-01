import { GameProvider } from './context/GameContext';
import Game from './components/Game';
import './styles/index.css';

function App() {
  return (
    <div className="app">
      <GameProvider>
        <Game />
      </GameProvider>
    </div>
  );
}

export default App;
