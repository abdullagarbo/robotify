import { useContext } from 'react';
import { RobotContext } from '../store/Context';
import { TABLE_SIZE } from '../data';

const Tabletop = () => {
  const { position } = useContext(RobotContext);
  const showArrow = (facing) => {
    switch (facing) {
      case 'NORTH':
        return '▲';
      case 'EAST':
        return '▶';
      case 'SOUTH':
        return '▼';
      case 'WEST':
        return '◀';
      default:
        return '';
    }
  };

  const renderCell = (x, y) => {
    const isRobotHere = position.x === x && position.y === y;
    return (
      <div
        key={`${x},${y}`}
        style={{
          width: '50px',
          height: '50px',
          border: '1px solid black',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: isRobotHere ? 'lightblue' : 'white',
          fontSize: '24px',
        }}
      >
        {isRobotHere ? showArrow(position.facing) : ''}
      </div>
    );
  };

  const renderRow = (y) => (
    <div key={y} style={{ display: 'flex' }}>
      {Array.from({ length: TABLE_SIZE }, (_, x) =>
        renderCell(x, TABLE_SIZE - 1 - y)
      )}
    </div>
  );

  return (
    <div>
      <h2>Tabletop</h2>
      <div style={{ display: 'inline-block' }}>
        {Array.from({ length: TABLE_SIZE }, (_, y) => renderRow(y))}
      </div>
    </div>
  );
};

export default Tabletop;
