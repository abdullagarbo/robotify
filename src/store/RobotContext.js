import { createContext } from 'react';

const RobotContext = createContext({
  position: { x: null, y: null, facing: null },
  output: '',
  commands: '',
  updateCommands: () => {},
  executeCommands: () => {},
});

export default RobotContext;
