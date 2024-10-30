import robotLogo from '../assets/robot.svg';

const Logo = () => {
  return (
    <a href='https://www.astrazeneca.com' target='_blank'>
      <img src={robotLogo} className='logo' alt='Robotify logo' />
    </a>
  );
};

export default Logo;
