import { useContext } from 'react';
import RobotContext from './store/RobotContext';
import Logo from './components/Logo';
import Tabletop from './components/Tabletop';
import TextArea from './components/UI/TextArea';
import Button from './components/UI/Button';
import './App.css';

function App() {
  const { position, output, commands, updateCommands, executeCommands } =
    useContext(RobotContext);
  return (
    <div>
      <Logo />
      <h1>Robotify Simulator</h1>
      <TextArea
        onChange={(e) => updateCommands(e.target.value)}
        commands={commands}
      />
      <br />
      <Button onClick={executeCommands} />
      <div>
        {output != '' && <h2>Output:</h2>}
        <p>{output}</p>
      </div>
      <Tabletop position={position} />
    </div>
  );
}

export default App;
