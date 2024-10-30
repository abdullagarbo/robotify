import PropTypes from 'prop-types';
import styles from './TextArea.module.css';

const TextArea = ({ commands, onChange }) => {
  return (
    <textarea
      className={styles['textArea']}
      rows='10'
      cols='30'
      placeholder='Enter commands here'
      value={commands}
      onChange={onChange}
    />
  );
};

TextArea.propTypes = {
  commands: PropTypes.string,
  onChange: PropTypes.func,
};

export default TextArea;
