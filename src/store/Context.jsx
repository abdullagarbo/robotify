import { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { TABLE_SIZE, DIRECTIONS } from '../data';

export const RobotContext = createContext();

export default function RobotContextProvider({ children }) {
  const [position, setPosition] = useState({ x: null, y: null, facing: null });
  const [output, setOutput] = useState('');
  const [commands, setCommands] = useState('');

  // FUNCTION TO HANDLE EXECUTE COMMANDS
  const executeCommands = () => {
    if (!commands.trim()) {
      alert('Please enter commands before running.');
      return;
    }

    const lines = commands.trim().split('\n');
    let tempPosition = { ...position };
    let hasPlaced = position.x !== null && position.y !== null;

    lines.forEach((line) => {
      const [command, args] = line.trim().split(' ');
      if (command === 'PLACE' && args) {
        const [x, y, facing] = args.split(',');
        tempPosition = placeRobot(parseInt(x, 10), parseInt(y, 10), facing);
        hasPlaced = true;
      } else if (hasPlaced) {
        if (command === 'MOVE') {
          tempPosition = moveRobot(tempPosition);
        } else if (command === 'LEFT') {
          tempPosition = turnRobot('LEFT', tempPosition);
        } else if (command === 'RIGHT') {
          tempPosition = turnRobot('RIGHT', tempPosition);
        } else if (command === 'REPORT') {
          setOutput(
            `Output: ${tempPosition.x},${tempPosition.y},${tempPosition.facing}`
          );
        }
      }
    });

    setPosition(tempPosition);
  };

  // FUNCTION TO HANDLE PLACE ROBOT
  const placeRobot = (x, y, facing) => {
    if (
      x >= 0 &&
      x < TABLE_SIZE &&
      y >= 0 &&
      y < TABLE_SIZE &&
      ['NORTH', 'SOUTH', 'EAST', 'WEST'].includes(facing)
    ) {
      return { x, y, facing };
    }
    return position;
  };

  // FUNCTION TO HANDLE MOVE ROBOT
  const moveRobot = (tempPosition) => {
    const { x, y, facing } = tempPosition;
    let newX = x;
    let newY = y;

    if (facing === 'NORTH' && y < TABLE_SIZE - 1) newY += 1;
    if (facing === 'SOUTH' && y > 0) newY -= 1;
    if (facing === 'EAST' && x < TABLE_SIZE - 1) newX += 1;
    if (facing === 'WEST' && x > 0) newX -= 1;

    return { x: newX, y: newY, facing };
  };

  // FUNCTION TO HANDLE TURN ROBOT
  const turnRobot = (direction, tempPosition) => {
    const currentIndex = DIRECTIONS.indexOf(tempPosition.facing);
    const newIndex =
      direction === 'LEFT' ? (currentIndex + 3) % 4 : (currentIndex + 1) % 4;

    return { ...tempPosition, facing: DIRECTIONS[newIndex] };
  };

  return (
    <RobotContext.Provider
      value={{ position, output, commands, setCommands, executeCommands }}
    >
      {children}
    </RobotContext.Provider>
  );
}

RobotContextProvider.propTypes = {
  children: PropTypes.element,
};
