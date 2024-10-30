import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className={styles['button']}
      onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
      onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
    >
      Run Commands
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;
