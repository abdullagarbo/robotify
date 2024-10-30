import { useContext } from 'react';
import { RobotContext } from './store/Context';
import Logo from './components/Logo';
import Tabletop from './components/Tabletop';
import TextArea from './components/UI/TextArea';
import Button from './components/UI/Button';
import './App.css';

function App() {
  const { output, executeCommands } = useContext(RobotContext);

  return (
    <div>
      <Logo />
      <h1>Robotify Simulator</h1>
      <TextArea />
      <br />
      <Button onClick={executeCommands} />
      <div>
        {output != '' && <h2>Output:</h2>}
        <p>{output}</p>
      </div>
      <Tabletop />
    </div>
  );
}

export default App;
