import { GameProvider } from './context/GameContext';
import Game from './components/Game';
import VersionInfo from './components/VersionInfo';
import './styles/index.css';

function App() {
  return (
    <div className="app">
      <GameProvider>
        <Game />
      </GameProvider>
      <VersionInfo />
    </div>
  );
}

export default App;
