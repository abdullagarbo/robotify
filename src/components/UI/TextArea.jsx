import { useContext } from 'react';
import { RobotContext } from '../../store/Context';
import styles from './TextArea.module.css';

const TextArea = () => {
  const { commands, setCommands } = useContext(RobotContext);

  return (
    <textarea
      className={styles['textArea']}
      rows='10'
      cols='30'
      placeholder='Enter commands here'
      value={commands}
      onChange={(e) => setCommands(e.target.value)}
    />
  );
};

export default TextArea;
