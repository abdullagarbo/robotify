import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RobotContext from './RobotContext';
import { TABLE_SIZE, DIRECTIONS } from '../data';

export default function RobotContextProvider({ children }) {
  const [data, setData] = useState({
    position: { x: null, y: null, facing: null },
    output: '',
    commands: '',
  });

  // Function to handle PLACE command
  function placeRobot(newX, newY, newFacing) {
    if (
      newX >= 0 &&
      newX < TABLE_SIZE &&
      newY >= 0 &&
      newY < TABLE_SIZE &&
      DIRECTIONS.includes(newFacing)
    ) {
      setData((prevData) => ({
        ...prevData,
        position: {
          ...prevData.position,
          x: newX !== undefined ? newX : prevData.position.x,
          y: newY !== undefined ? newY : prevData.position.y,
          facing:
            newFacing !== undefined ? newFacing : prevData.position.facing,
        },
      }));
    }
  }

  // Function to handle MOVE command
  function moveRobot() {
    let { x, y, facing } = data.position;

    if (x === null || y === null) return; // Ignore if not placed

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

    setData((prevData) => ({
      ...prevData,
      position: { x, y, facing },
    }));
  }

  // Function to handle LEFT and RIGHT command
  function turnRobot(direction) {
    const { facing } = data.position;
    if (facing === null) return; // Ignore if not placed

    const currentIndex = DIRECTIONS.indexOf(facing);
    const newIndex =
      direction === 'LEFT'
        ? (currentIndex + 3) % 4 // -90 degrees
        : (currentIndex + 1) % 4; // +90 degrees

    setData((prevData) => ({
      ...prevData,
      position: {
        ...prevData.position,
        facing: DIRECTIONS[newIndex],
      },
    }));
  }

  // Function to handle REPORT command
  function reportPosition() {
    const { x, y, facing } = data.position;
    if (x !== null && y !== null && facing) {
      setData((prevData) => ({
        ...prevData,
        output: `${x},${y},${facing}`,
      }));
    }
  }

  // Function to update commands
  function updateCommands(commands) {
    setData((prevData) => ({
      ...prevData,
      commands,
    }));
  }

  // Function to handle and parse commands
  function executeCommands() {
    const { commands } = data;
    if (!commands.trim()) {
      alert('Please enter commands before running.');
      return;
    }

    const lines = commands.trim().split('\n');

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
  }

  const ctxValue = useMemo(
    () => ({
      position: data.position,
      output: data.output,
      commands: data.commands,
      updateCommands: updateCommands,
      executeCommands: executeCommands,
    }),
    [data]
  );

  return (
    <RobotContext.Provider value={ctxValue}>{children}</RobotContext.Provider>
  );
}

RobotContextProvider.propTypes = {
  children: PropTypes.element,
};
