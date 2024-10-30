import robotLogo from './assets/robot.svg';
import './App.css';

function App() {
  return (
    <div>
      <a href='/#' target='_blank'>
        <img src={robotLogo} className='logo' alt='Robotify logo' />
      </a>
      <h1>Robotify</h1>
    </div>
  );
}

export default App;
