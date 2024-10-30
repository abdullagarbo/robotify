import { useState } from 'react';
import Logo from './components/Logo';
import Tabletop from './components/Tabletop';
import TextArea from './components/UI/TextArea';
import Button from './components/UI/Button';
import { TABLE_SIZE, DIRECTIONS } from './data';
import './App.css';

function App() {
  const [position, setPosition] = useState({ x: null, y: null, facing: null });
  const [output, setOutput] = useState('');
  const [commands, setCommands] = useState('');

  // Function to handle PLACE command
  const placeRobot = (x, y, facing) => {
    if (
      x >= 0 &&
      x < TABLE_SIZE &&
      y >= 0 &&
      y < TABLE_SIZE &&
      DIRECTIONS.includes(facing)
    ) {
      setPosition({ x, y, facing });
    }
  };

  // Function to handle MOVE command
  const moveRobot = () => {
    if (position.x === null || position.y === null) return; // Ignore if not placed

    let { x, y, facing } = position;
    switch (facing) {
      case 'NORTH':
        if (y < TABLE_SIZE - 1) y += 1;
        break;
      case 'SOUTH':
        if (y > 0) y -= 1;
        break;
      case 'EAST':
        if (x < TABLE_SIZE - 1) x += 1;
        break;
      case 'WEST':
        if (x > 0) x -= 1;
        break;
      default:
        return;
    }
    setPosition({ x, y, facing });
  };

  // Function to handle LEFT and RIGHT command
  const turnRobot = (direction) => {
    if (position.facing === null) return; // Ignore if not placed

    const currentIndex = DIRECTIONS.indexOf(position.facing);
    const newIndex =
      direction === 'LEFT'
        ? (currentIndex + 3) % 4 // -90 degrees
        : (currentIndex + 1) % 4; // +90 degrees

    setPosition({ ...position, facing: DIRECTIONS[newIndex] });
  };

  // Function to handle REPORT command
  const reportPosition = () => {
    if (position.x !== null && position.y !== null && position.facing) {
      setOutput(`${position.x},${position.y},${position.facing}`);
    }
  };

  // Function to handle and parse commands
  const executeCommands = () => {
    if (!commands.trim()) {
      alert('Please enter commands before running.');
      return;
    }

    const lines = commands.split('\n');

    lines.forEach((line) => {
      const [command, args] = line.trim().split(' ');

      if (command === 'PLACE' && args) {
        const [x, y, facing] = args.split(',');
        placeRobot(parseInt(x, 10), parseInt(y, 10), facing);
      } else if (command === 'MOVE') {
        moveRobot();
      } else if (command === 'LEFT') {
        turnRobot('LEFT');
      } else if (command === 'RIGHT') {
        turnRobot('RIGHT');
      } else if (command === 'REPORT') {
        reportPosition();
      }
    });
  };

  return (
    <div>
      <Logo />
      <h1>Robotify Simulator</h1>
      <TextArea
        onChange={(e) => setCommands(e.target.value)}
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
