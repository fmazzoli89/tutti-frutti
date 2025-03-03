import '../styles/MainScreen.css';
import Game from './Game';

const MainScreen = () => {
  return (
    <div className="main-screen">
      <div className="game-container">
        <Game />
      </div>
    </div>
  );
};

export default MainScreen; 